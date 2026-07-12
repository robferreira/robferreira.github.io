import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Parser from 'rss-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_PATH = join(ROOT, 'data', 'medium-posts.json');
const POSTS_JS_PATH = join(ROOT, 'js', 'blog', 'posts-data.js');
const FEED_URL = process.env.MEDIUM_FEED_URL || 'https://medium.com/feed/@robinson_ferreira';
const PLACEHOLDER_IMAGE = 'images/blog-placeholder.svg';
const FETCH_TIMEOUT_MS = 15000;
const MAX_POSTS = 6;
const EXCERPT_MAX_LENGTH = 160;
const WORDS_PER_MINUTE = 225;
const MIN_WORDS_FOR_READING_TIME = 50;

const IGNORED_IMAGE_PATTERNS = [
    /pixel\.gif/i,
    /gravatar\.com/i,
    /medium\.com\/\?_/i,
    /cdn-images-1\.medium\.com\/proxy/i,
    /badge/i,
    /avatar/i,
    /favicon/i,
    /logo/i,
    /icon/i,
    /1x1/i,
    /tracking/i
];

const parser = new Parser({
    customFields: {
        item: [
            ['content:encoded', 'contentEncoded'],
            ['media:thumbnail', 'mediaThumbnail', { keepArray: false }]
        ]
    }
});

function log(message) {
    console.log(`[fetch-medium] ${message}`);
}

function warn(message) {
    console.warn(`[fetch-medium] ${message}`);
}

function readExistingData() {
    if (!existsSync(OUTPUT_PATH)) {
        return null;
    }
    try {
        return JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'));
    } catch {
        return null;
    }
}

function writeData(data) {
    writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
    writePostsJs(data);
}

function writePostsJs(data) {
    const content = 'window.BLOG_POSTS_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
    writeFileSync(POSTS_JS_PATH, content, 'utf8');
}

function decodeHtmlEntities(text) {
    if (!text) return '';

    const entities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&apos;': "'",
        '&nbsp;': ' '
    };

    let decoded = text.replace(/&#(\d+);/g, (_, code) => {
        const num = parseInt(code, 10);
        return num > 0 && num < 65536 ? String.fromCharCode(num) : '';
    });

    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
        const num = parseInt(hex, 16);
        return num > 0 && num < 65536 ? String.fromCharCode(num) : '';
    });

    return decoded.replace(/&[a-zA-Z]+;/g, (entity) => entities[entity] || entity);
}

function stripHtml(html) {
    if (!html) return '';

    let text = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return decodeHtmlEntities(text);
}

function isValidHttpsUrl(url) {
    if (!url || typeof url !== 'string') return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:';
    } catch {
        return false;
    }
}

function isIgnoredImage(url) {
    return IGNORED_IMAGE_PATTERNS.some((pattern) => pattern.test(url));
}

function extractImageDimensions(url) {
    const widthMatch = url.match(/[?&]w=(\d+)/i);
    const heightMatch = url.match(/[?&]h=(\d+)/i);
    return {
        width: widthMatch ? parseInt(widthMatch[1], 10) : null,
        height: heightMatch ? parseInt(heightMatch[1], 10) : null
    };
}

function isValidImageUrl(url) {
    if (!isValidHttpsUrl(url)) return false;
    if (isIgnoredImage(url)) return false;

    const { width, height } = extractImageDimensions(url);
    if (width !== null && width < 200) return false;
    if (height !== null && height < 200) return false;

    return true;
}

function extractImagesFromHtml(html) {
    if (!html) return [];
    const images = [];
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
        images.push(match[1]);
    }
    return images;
}

function resolveImage(item) {
    const candidates = [];

    if (item.enclosure && item.enclosure.url) {
        candidates.push(item.enclosure.url);
    }

    if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url) {
        candidates.push(item.mediaThumbnail.$.url);
    }

    if (item['media:content'] && item['media:content'].$ && item['media:content'].$.url) {
        candidates.push(item['media:content'].$.url);
    }

    const content = item.contentEncoded || item.content || item['content:encoded'] || '';
    candidates.push(...extractImagesFromHtml(content));
    candidates.push(...extractImagesFromHtml(item.description || ''));

    for (const candidate of candidates) {
        let url = candidate;
        if (url.startsWith('//')) {
            url = 'https:' + url;
        }
        if (isValidImageUrl(url)) {
            return url;
        }
    }

    return null;
}

function buildExcerpt(item) {
    const raw = item.contentSnippet || item.summary || item.description || '';
    const plain = stripHtml(raw || item.contentEncoded || item.content || '');

    if (plain.length <= EXCERPT_MAX_LENGTH) {
        return plain;
    }

    const truncated = plain.slice(0, EXCERPT_MAX_LENGTH);
    const lastSpace = truncated.lastIndexOf(' ');
    const base = lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated;
    return base.trim() + '…';
}

function calcReadingTime(item) {
    const content = item.contentEncoded || item.content || item['content:encoded'] || item.description || '';
    const plain = stripHtml(content);
    const words = plain.split(/\s+/).filter(Boolean);

    if (words.length < MIN_WORDS_FOR_READING_TIME) {
        return null;
    }

    return Math.ceil(words.length / WORDS_PER_MINUTE);
}

function extractTitle(item) {
    var content = item.contentEncoded || item.content || item['content:encoded'] || '';

    var mediumTitleMatch = content.match(/class="[^"]*graf--title[^"]*"[^>]*>([^<]+)</i);
    if (mediumTitleMatch) {
        var mediumTitle = stripHtml(mediumTitleMatch[1]).trim();
        if (mediumTitle.length > 5) return mediumTitle;
    }

    var headingMatch = content.match(/<h[12][^>]*>([^<]+)<\/h[12]>/i);
    if (headingMatch) {
        var fromHeading = stripHtml(headingMatch[1]).trim();
        if (fromHeading.length > 5) return fromHeading;
    }

    var title = stripHtml(item.title || '').trim();
    if (title && title.length > 15 && !title.startsWith('é ') && !title.startsWith('Bom ')) {
        return title;
    }

    if (item.link) {
        try {
            var pathname = decodeURIComponent(new URL(item.link).pathname);
            var segments = pathname.split('/').filter(Boolean);
            var slugSegment = segments.length >= 2 ? segments[segments.length - 2] : segments[segments.length - 1];
            var slug = (slugSegment || '').replace(/-[a-f0-9]{12}$/i, '').replace(/-/g, ' ');
            if (slug.length > 10) {
                return slug.charAt(0).toUpperCase() + slug.slice(1);
            }
        } catch {
            // ignore
        }
    }

    return title || 'Artigo';
}

function normalizePost(item) {
    const link = item.link || item.guid || '';
    if (!isValidHttpsUrl(link)) {
        return null;
    }

    const publishedAt = item.isoDate || item.pubDate || new Date().toISOString();
    const id = item.guid || item.id || link;
    const categories = (item.categories || [])
        .map((cat) => stripHtml(String(cat)).trim())
        .filter(Boolean)
        .slice(0, 5);

    return {
        id: String(id),
        title: extractTitle(item),
        link,
        publishedAt: new Date(publishedAt).toISOString(),
        excerpt: buildExcerpt(item),
        image: resolveImage(item),
        categories,
        readingTime: calcReadingTime(item)
    };
}

function postsAreEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

async function fetchFeed() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const response = await fetch(FEED_URL, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'robferreira-blog-fetch/1.0',
                Accept: 'application/rss+xml, application/xml, text/xml'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const xml = await response.text();
        return parser.parseString(xml);
    } finally {
        clearTimeout(timeout);
    }
}

async function main() {
    const existing = readExistingData();
    const fallbackPosts = existing && Array.isArray(existing.posts) ? existing.posts : [];

    try {
        log(`Buscando feed: ${FEED_URL}`);
        const feed = await fetchFeed();

        const posts = (feed.items || [])
            .map(normalizePost)
            .filter(Boolean)
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            .slice(0, MAX_POSTS)
            .map((post) => ({
                ...post,
                image: post.image || PLACEHOLDER_IMAGE
            }));

        if (posts.length === 0 && fallbackPosts.length > 0) {
            warn('Feed retornou sem artigos válidos. Preservando JSON anterior.');
            return;
        }

        const postsChanged = !postsAreEqual(posts, fallbackPosts);
        const output = {
            generatedAt: postsChanged ? new Date().toISOString() : (existing && existing.generatedAt) || new Date().toISOString(),
            source: FEED_URL,
            posts
        };

        writeData(output);
        log(`Sucesso: ${posts.length} artigo(s) salvo(s) em data/medium-posts.json e js/blog/posts-data.js`);
    } catch (error) {
        const reason = error && error.name === 'AbortError' ? 'timeout' : (error && error.message) || 'erro desconhecido';
        warn(`Falha ao buscar feed (${reason}).`);

        if (existing && Array.isArray(existing.posts)) {
            warn('Preservando último JSON válido.');
            if (!existsSync(POSTS_JS_PATH)) {
                writePostsJs(existing);
                log('Gerado js/blog/posts-data.js a partir do JSON existente.');
            }
            return;
        }

        const emptyData = {
            generatedAt: new Date().toISOString(),
            source: FEED_URL,
            posts: []
        };
        writeData(emptyData);
        warn('Primeira execução sem JSON anterior. Gerado arquivo vazio.');
    }
}

main();

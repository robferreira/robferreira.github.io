var BlogCard = (function() {
    var PLACEHOLDER = 'images/blog-placeholder.svg';
    var MEDIUM_PROFILE = 'https://medium.com/@robinson_ferreira';

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }

    function formatDate(isoDate, lang) {
        var locale = lang === 'pt' ? 'pt-BR' : 'en-US';
        return new Intl.DateTimeFormat(locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(new Date(isoDate));
    }

    function formatReadingTime(minutes, lang) {
        if (!minutes) return '';
        var template = typeof I18n !== 'undefined' ? I18n.t('blog.section.minRead') : '{min} min';
        return template.replace('{min}', String(minutes));
    }

    function renderTags(categories) {
        if (!categories || !categories.length) {
            return '';
        }

        return (
            '<div class="blog-card-tags">' +
                categories.slice(0, 4).map(function(tag) {
                    return '<span class="blog-badge">' + escapeHtml(tag) + '</span>';
                }).join('') +
            '</div>'
        );
    }

    function renderBlogCard(post, lang) {
        var image = post.image || PLACEHOLDER;
        var readingTime = formatReadingTime(post.readingTime, lang);
        var readLabel = typeof I18n !== 'undefined' ? I18n.t('blog.section.readArticle') : 'Ler artigo';
        var metaExtra = readingTime
            ? '<span class="blog-card-reading">' + escapeHtml(readingTime) + '</span>'
            : '';

        return (
            '<article class="blog-card glass-card">' +
                '<a class="blog-card-link" href="' + escapeHtml(post.link) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(post.title) + ' — ' + escapeHtml(readLabel) + '">' +
                    '<div class="blog-card-media">' +
                        '<img class="blog-card-image" src="' + escapeHtml(image) + '" alt="' + escapeHtml(post.title) + '" loading="lazy" width="640" height="360" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';">' +
                    '</div>' +
                    '<div class="blog-card-body">' +
                        '<div class="blog-card-meta">' +
                            '<time class="blog-card-date" datetime="' + escapeHtml(post.publishedAt) + '">' + escapeHtml(formatDate(post.publishedAt, lang)) + '</time>' +
                            metaExtra +
                        '</div>' +
                        '<h2 class="blog-card-title">' + escapeHtml(post.title) + '</h2>' +
                        '<p class="blog-card-excerpt">' + escapeHtml(post.excerpt) + '</p>' +
                        renderTags(post.categories) +
                        '<span class="blog-card-cta">' + escapeHtml(readLabel) + '</span>' +
                    '</div>' +
                '</a>' +
            '</article>'
        );
    }

    return {
        renderBlogCard: renderBlogCard,
        PLACEHOLDER: PLACEHOLDER,
        MEDIUM_PROFILE: MEDIUM_PROFILE
    };
})();

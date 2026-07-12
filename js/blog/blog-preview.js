var BlogPreview = (function() {
    var DATA_URL = 'data/medium-posts.json';
    var postsData = [];
    var isLoaded = false;

    function getLang() {
        return typeof I18n !== 'undefined' ? I18n.getLanguage() : 'pt';
    }

    function setLoading(loading) {
        var loadingEl = document.getElementById('blog-loading');
        var grid = document.getElementById('blog-grid');
        var empty = document.getElementById('blog-empty');

        if (loadingEl) {
            loadingEl.hidden = !loading;
        }
        if (loading && grid) {
            grid.hidden = true;
        }
        if (loading && empty) {
            empty.hidden = true;
        }
    }

    function applyPosts(data) {
        postsData = data && Array.isArray(data.posts) ? data.posts : [];
        isLoaded = true;
        setLoading(false);
        renderPosts();
    }

    function renderPosts() {
        var grid = document.getElementById('blog-grid');
        var empty = document.getElementById('blog-empty');
        if (!grid) return;

        var lang = getLang();
        grid.innerHTML = '';

        if (!postsData.length) {
            if (empty) {
                empty.hidden = false;
            }
            grid.hidden = true;
            return;
        }

        if (empty) {
            empty.hidden = true;
        }
        grid.hidden = false;

        postsData.forEach(function(post) {
            grid.insertAdjacentHTML('beforeend', BlogCard.renderBlogCard(post, lang));
        });
    }

    function loadFromEmbedded() {
        if (window.BLOG_POSTS_DATA && Array.isArray(window.BLOG_POSTS_DATA.posts)) {
            applyPosts(window.BLOG_POSTS_DATA);
            return true;
        }
        return false;
    }

    function loadFromFetch() {
        return fetch(DATA_URL)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Failed to load posts');
                }
                return response.json();
            })
            .then(function(data) {
                applyPosts(data);
            });
    }

    function loadPosts() {
        setLoading(true);

        if (loadFromEmbedded()) {
            return Promise.resolve();
        }

        return loadFromFetch().catch(function() {
            if (window.BLOG_POSTS_DATA) {
                applyPosts(window.BLOG_POSTS_DATA);
                return;
            }
            applyPosts({ posts: [] });
        });
    }

    function refresh() {
        if (isLoaded) {
            renderPosts();
        }
    }

    function init() {
        loadPosts();
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        refresh: refresh,
        loadPosts: loadPosts
    };
})();

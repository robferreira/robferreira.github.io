var BlogPreview = (function() {
    var DATA_URL = 'data/medium-posts.json';
    var DESKTOP_MQ = '(min-width: 992px)';
    var postsData = [];
    var isLoaded = false;
    var lastLayoutKey = '';
    var scrollTimer = null;
    var resizeBound = false;
    var scrollBound = false;

    function t(key) {
        return typeof I18n !== 'undefined' ? I18n.t(key) : key;
    }

    function getLang() {
        return typeof I18n !== 'undefined' ? I18n.getLanguage() : 'pt';
    }

    function getLayoutConfig(count) {
        var isDesktop = window.matchMedia(DESKTOP_MQ).matches;
        var pageSize = isDesktop ? 3 : 1;
        var threshold = isDesktop ? 3 : 1;
        var needsCarousel = count > threshold;

        return {
            isDesktop: isDesktop,
            pageSize: pageSize,
            needsCarousel: needsCarousel,
            key: (isDesktop ? 'd' : 'm') + ':' + (needsCarousel ? 'c' : 's') + ':' + pageSize + ':' + count
        };
    }

    function chunkPosts(posts, pageSize) {
        var pages = [];
        for (var i = 0; i < posts.length; i += pageSize) {
            pages.push(posts.slice(i, i + pageSize));
        }
        return pages;
    }

    function setLoading(loading) {
        var loadingEl = document.getElementById('blog-loading');
        var grid = document.getElementById('blog-grid');
        var empty = document.getElementById('blog-empty');
        var dots = document.getElementById('blog-carousel-dots');

        if (loadingEl) {
            loadingEl.hidden = !loading;
        }
        if (loading && grid) {
            grid.hidden = true;
        }
        if (loading && empty) {
            empty.hidden = true;
        }
        if (loading && dots) {
            dots.hidden = true;
        }
    }

    function applyPosts(data) {
        postsData = data && Array.isArray(data.posts) ? data.posts : [];
        isLoaded = true;
        setLoading(false);
        renderPosts();
    }

    function getActivePageIndex(scroll, pages) {
        var scrollLeft = scroll.scrollLeft;
        var activeIndex = 0;
        var minDistance = Infinity;

        for (var i = 0; i < pages.length; i += 1) {
            var distance = Math.abs(pages[i].offsetLeft - scrollLeft);
            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = i;
            }
        }

        return activeIndex;
    }

    function setActiveDot(dots, index) {
        var dotButtons = dots.querySelectorAll('.blog-carousel-dot');

        for (var i = 0; i < dotButtons.length; i += 1) {
            var isActive = i === index;
            dotButtons[i].classList.toggle('is-active', isActive);
            dotButtons[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
        }
    }

    function bindCarousel(scroll, dots) {
        var pages = scroll.querySelectorAll('.blog-page');

        function goToPage(pageIndex) {
            if (!pages[pageIndex]) {
                return;
            }
            scroll.scrollTo({
                left: pages[pageIndex].offsetLeft,
                behavior: 'smooth'
            });
        }

        dots.innerHTML = '';
        dots.setAttribute('aria-label', t('blog.carouselAria'));
        dots.hidden = false;

        for (var i = 0; i < pages.length; i += 1) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'blog-carousel-dot';
            button.setAttribute('data-index', String(i));
            button.setAttribute('role', 'tab');
            button.setAttribute(
                'aria-label',
                t('blog.carouselGoToPage').replace('{page}', String(i + 1))
            );
            button.addEventListener('click', function() {
                goToPage(Number(this.getAttribute('data-index')));
            });
            dots.appendChild(button);
        }

        setActiveDot(dots, getActivePageIndex(scroll, pages));

        if (!scrollBound) {
            scroll.addEventListener('scroll', function() {
                window.clearTimeout(scrollTimer);
                scrollTimer = window.setTimeout(function() {
                    var currentPages = scroll.querySelectorAll('.blog-page');
                    setActiveDot(dots, getActivePageIndex(scroll, currentPages));
                }, 80);
            }, { passive: true });
            scrollBound = true;
        }
    }

    function renderStatic(grid, dots, lang) {
        grid.classList.remove('blog-scroll', 'is-carousel');
        grid.classList.add('blog-grid');
        grid.removeAttribute('aria-roledescription');

        if (dots) {
            dots.innerHTML = '';
            dots.hidden = true;
        }

        postsData.forEach(function(post) {
            grid.insertAdjacentHTML('beforeend', BlogCard.renderBlogCard(post, lang));
        });
    }

    function renderCarousel(grid, dots, lang, pageSize) {
        grid.classList.add('blog-scroll', 'is-carousel');
        grid.classList.remove('blog-grid');
        grid.setAttribute('aria-roledescription', 'carousel');

        var pages = chunkPosts(postsData, pageSize);

        pages.forEach(function(pagePosts, pageIndex) {
            var isLast = pageIndex === pages.length - 1;
            var pageClass = 'blog-page' + (isLast && pagePosts.length < pageSize ? ' blog-page--last' : '');
            var cardsHtml = pagePosts.map(function(post) {
                return BlogCard.renderBlogCard(post, lang);
            }).join('');

            grid.insertAdjacentHTML(
                'beforeend',
                '<div class="' + pageClass + '" role="group" aria-label="' +
                    t('blog.carouselGoToPage').replace('{page}', String(pageIndex + 1)) +
                '">' + cardsHtml + '</div>'
            );
        });

        if (dots) {
            bindCarousel(grid, dots);
        }
    }

    function renderPosts() {
        var grid = document.getElementById('blog-grid');
        var empty = document.getElementById('blog-empty');
        var dots = document.getElementById('blog-carousel-dots');
        if (!grid) return;

        var lang = getLang();
        var layout = getLayoutConfig(postsData.length);
        lastLayoutKey = layout.key;

        grid.innerHTML = '';

        if (!postsData.length) {
            if (empty) {
                empty.hidden = false;
            }
            grid.hidden = true;
            if (dots) {
                dots.innerHTML = '';
                dots.hidden = true;
            }
            return;
        }

        if (empty) {
            empty.hidden = true;
        }
        grid.hidden = false;

        if (layout.needsCarousel) {
            renderCarousel(grid, dots, lang, layout.pageSize);
        } else {
            renderStatic(grid, dots, lang);
        }
    }

    function onResize() {
        if (!isLoaded || !postsData.length) {
            return;
        }

        var layout = getLayoutConfig(postsData.length);
        if (layout.key !== lastLayoutKey) {
            renderPosts();
        } else if (layout.needsCarousel) {
            var grid = document.getElementById('blog-grid');
            var dots = document.getElementById('blog-carousel-dots');
            if (grid && dots && !dots.hidden) {
                var pages = grid.querySelectorAll('.blog-page');
                setActiveDot(dots, getActivePageIndex(grid, pages));
            }
        }
    }

    function ensureResizeListener() {
        if (resizeBound) {
            return;
        }
        window.addEventListener('resize', onResize);
        resizeBound = true;
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
        ensureResizeListener();

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

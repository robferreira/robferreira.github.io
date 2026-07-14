var I18n = (function() {
    var currentLang = 'en';

    function detectLanguage() {
        var saved = localStorage.getItem('lang');
        if (saved && translations[saved]) {
            return saved;
        }
        var browser = navigator.language || navigator.userLanguage || 'en';
        return browser.toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
    }

    function t(key) {
        var keys = key.split('.');
        var value = translations[currentLang];
        for (var i = 0; i < keys.length; i++) {
            if (value === undefined || value === null) {
                return key;
            }
            value = value[keys[i]];
        }
        return value !== undefined ? value : key;
    }

    function applyStaticTranslations() {
        var elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            var value = t(key);
            if (el.hasAttribute('data-i18n-html')) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });

        var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(function(el) {
            var key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        document.title = t('meta.title');
        document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    }

    function updateLangSwitcher() {
        var buttons = document.querySelectorAll('#lang-switcher [data-lang]');
        buttons.forEach(function(btn) {
            var lang = btn.getAttribute('data-lang');
            if (lang === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function renderDynamicContent() {
        if (typeof renderMenu === 'function') {
            renderMenu(currentLang);
        }
        if (typeof renderTimeline === 'function') {
            renderTimeline(currentLang);
        }
        if (typeof renderSocialMedia === 'function') {
            renderSocialMedia(currentLang);
        }
        if (typeof restartTypewriter === 'function') {
            restartTypewriter(t('typewriter'));
        }
        if (typeof updateAge === 'function') {
            updateAge();
        }
        if (typeof ContactForm !== 'undefined' && typeof ContactForm.refreshLabels === 'function') {
            ContactForm.refreshLabels();
        }
        if (typeof BlogPreview !== 'undefined' && typeof BlogPreview.refresh === 'function') {
            BlogPreview.refresh();
        }
        if (typeof Testimonials !== 'undefined' && typeof Testimonials.refresh === 'function') {
            Testimonials.refresh();
        }
        if (typeof TestimonialsForm !== 'undefined' && typeof TestimonialsForm.refreshLabels === 'function') {
            TestimonialsForm.refreshLabels();
        }
    }

    function closeMobileNav() {
        var nav = document.getElementById('ftco-nav');
        if (nav && nav.classList.contains('show') && typeof $ !== 'undefined') {
            $('#ftco-nav').collapse('hide');
        }
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            return;
        }
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyStaticTranslations();
        updateLangSwitcher();
        renderDynamicContent();
        closeMobileNav();
    }

    function getLanguage() {
        return currentLang;
    }

    function init() {
        currentLang = detectLanguage();
        applyStaticTranslations();
        updateLangSwitcher();
        renderDynamicContent();

        var switcher = document.getElementById('lang-switcher');
        if (switcher) {
            switcher.addEventListener('click', function(e) {
                var btn = e.target.closest('[data-lang]');
                if (btn) {
                    setLanguage(btn.getAttribute('data-lang'));
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        t: t,
        setLanguage: setLanguage,
        getLanguage: getLanguage
    };
})();

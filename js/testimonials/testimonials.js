var Testimonials = (function() {
	var MAX_QUOTE_LENGTH = 240;

	function getLang() {
		return typeof I18n !== 'undefined' ? I18n.getLanguage() : 'pt';
	}

	function escapeHtml(value) {
		return String(value)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function getInitials(name) {
		var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
		if (!parts.length) {
			return '?';
		}
		if (parts.length === 1) {
			return parts[0].charAt(0).toUpperCase();
		}
		return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
	}

	function clampQuote(quote) {
		var text = String(quote || '').trim();
		if (text.length <= MAX_QUOTE_LENGTH) {
			return text;
		}
		return text.slice(0, MAX_QUOTE_LENGTH - 1).trim() + '…';
	}

	function getQuote(item, lang) {
		if (!item || !item.quote) {
			return '';
		}
		return clampQuote(item.quote[lang] || item.quote.pt || item.quote.en || '');
	}

	function isValidLinkedInUrl(url) {
		if (!url || typeof url !== 'string') {
			return false;
		}
		var trimmed = url.trim();
		return trimmed.indexOf('https://') === 0 || trimmed.indexOf('http://') === 0;
	}

	function renderLinkedInButton(item, name) {
		if (!isValidLinkedInUrl(item.linkedin)) {
			return '';
		}

		var label = typeof I18n !== 'undefined' ? I18n.t('testimonials.linkedin') : 'LinkedIn';
		var ariaTemplate = typeof I18n !== 'undefined'
			? I18n.t('testimonials.linkedinAria')
			: 'Ver perfil de {name} no LinkedIn';
		var ariaLabel = String(ariaTemplate).replace('{name}', name);

		return (
			'<a class="testimonial-linkedin" href="' + escapeHtml(item.linkedin.trim()) + '" ' +
				'target="_blank" rel="noopener noreferrer" ' +
				'aria-label="' + escapeHtml(ariaLabel) + '">' +
				'<span class="ion-logo-linkedin" aria-hidden="true"></span>' +
				'<span>' + escapeHtml(label) + '</span>' +
			'</a>'
		);
	}

	function renderCard(item, lang) {
		var name = item.name || '';
		var quote = getQuote(item, lang);
		var initials = getInitials(name);
		var linkedInButton = renderLinkedInButton(item, name);

		return (
			'<article class="testimonial-card">' +
				'<div class="testimonial-avatar" aria-hidden="true">' + escapeHtml(initials) + '</div>' +
				'<div class="testimonial-body">' +
					'<p class="testimonial-quote">“' + escapeHtml(quote) + '”</p>' +
					'<div class="testimonial-meta">' +
						'<p class="testimonial-name">' + escapeHtml(name) + '</p>' +
						linkedInButton +
					'</div>' +
				'</div>' +
			'</article>'
		);
	}

	function buildTrack(items, lang, rowClass) {
		if (!items || !items.length) {
			return '';
		}

		var cards = items.map(function(item) {
			return renderCard(item, lang);
		}).join('');

		return (
			'<div class="testimonials-row ' + rowClass + '">' +
				'<div class="testimonials-track">' +
					cards +
				'</div>' +
			'</div>'
		);
	}

	function splitRows(items) {
		if (items.length <= 1) {
			return {
				row1: items.slice(),
				row2: []
			};
		}

		var mid = Math.ceil(items.length / 2);
		return {
			row1: items.slice(0, mid),
			row2: items.slice(mid)
		};
	}

	function render(lang) {
		var root = document.getElementById('testimonialsMarquee');
		if (!root) {
			return;
		}

		if (typeof testimonialsData === 'undefined' || !testimonialsData.length) {
			root.innerHTML = '';
			return;
		}

		if (typeof I18n !== 'undefined') {
			root.setAttribute('aria-label', I18n.t('testimonials.ariaLabel'));
		}

		var rows = splitRows(testimonialsData);
		root.innerHTML =
			buildTrack(rows.row1, lang, 'testimonials-row--a') +
			buildTrack(rows.row2, lang, 'testimonials-row--b');
	}

	function refresh() {
		render(getLang());
	}

	function init() {
		refresh();
	}

	document.addEventListener('DOMContentLoaded', init);

	return {
		init: init,
		refresh: refresh
	};
})();

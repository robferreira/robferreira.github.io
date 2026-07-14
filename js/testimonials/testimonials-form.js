var TestimonialsForm = (function() {
	var form;
	var nameInput;
	var quoteInput;
	var linkedinSlugInput;
	var honeypotInput;
	var submitBtn;
	var statusEl;
	var charCountEl;
	var toggleBtn;
	var collapseEl;
	var isSubmitting = false;

	function t(key) {
		return typeof I18n !== 'undefined' ? I18n.t(key) : key;
	}

	function getConfig() {
		return window.TESTIMONIALS_FORM_CONFIG || {};
	}

	function getMinQuoteLength() {
		return getConfig().minQuoteLength || 20;
	}

	function getMaxQuoteLength() {
		return getConfig().maxQuoteLength || 240;
	}

	function getLinkedInPrefix() {
		return getConfig().linkedinPrefix || 'https://www.linkedin.com/in/';
	}

	function normalizeLinkedInSlug(slug) {
		var value = String(slug || '').trim();
		value = value.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '');
		value = value.replace(/^\/+|\/+$/g, '');
		return value;
	}

	function buildLinkedInUrl(slug) {
		var clean = normalizeLinkedInSlug(slug);
		if (!clean) {
			return '';
		}
		return getLinkedInPrefix() + clean + '/';
	}

	function sendTestimonial(data) {
		var config = getConfig();
		var endpoint = config.endpoint;

		if (!endpoint || endpoint.indexOf('SEU_FORM_ID') !== -1) {
			return Promise.reject(new Error('endpoint_not_configured'));
		}

		var body = {
			name: data.name || '',
			quote: data.quote || '',
			linkedin: data.linkedin || '',
			_subject: 'Depoimento — robferreira.github.io'
		};

		return fetch(endpoint, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}).then(function(response) {
			if (!response.ok) {
				return response.json().catch(function() {
					return {};
				}).then(function(errData) {
					var err = new Error('send_failed');
					err.details = errData;
					throw err;
				});
			}
			return response.json().catch(function() {
				return {};
			});
		});
	}

	function validateName(value) {
		if (!value || !value.trim()) {
			return 'testimonials.form.errors.nameRequired';
		}
		return null;
	}

	function validateQuote(value) {
		var minLen = getMinQuoteLength();
		var maxLen = getMaxQuoteLength();
		var text = value ? value.trim() : '';

		if (!text) {
			return 'testimonials.form.errors.quoteRequired';
		}
		if (text.length < minLen) {
			return 'testimonials.form.errors.quoteTooShort';
		}
		if (text.length > maxLen) {
			return 'testimonials.form.errors.quoteTooLong';
		}
		return null;
	}

	function setFieldError(fieldId, errorKey) {
		var input = document.getElementById(fieldId);
		var errorEl = document.getElementById(fieldId + '-error');
		if (!input || !errorEl) {
			return;
		}

		if (errorKey) {
			input.classList.add('is-invalid');
			input.setAttribute('aria-invalid', 'true');
			errorEl.textContent = t(errorKey)
				.replace('{min}', String(getMinQuoteLength()))
				.replace('{max}', String(getMaxQuoteLength()));
			errorEl.hidden = false;
		} else {
			input.classList.remove('is-invalid');
			input.removeAttribute('aria-invalid');
			errorEl.textContent = '';
			errorEl.hidden = true;
		}
	}

	function clearAllFieldErrors() {
		setFieldError('testimonial-name', null);
		setFieldError('testimonial-quote', null);
	}

	function setStatus(type, message) {
		if (!statusEl) {
			return;
		}
		statusEl.className = 'testimonial-form-status';
		statusEl.hidden = true;
		statusEl.textContent = '';

		if (!type || !message) {
			statusEl.setAttribute('aria-live', 'off');
			return;
		}

		statusEl.classList.add('testimonial-form-status--' + type);
		statusEl.textContent = message;
		statusEl.hidden = false;
		statusEl.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
	}

	function setLoading(loading) {
		isSubmitting = loading;
		if (!submitBtn) {
			return;
		}
		submitBtn.disabled = loading;
		submitBtn.classList.toggle('is-loading', loading);
		submitBtn.setAttribute('aria-busy', loading ? 'true' : 'false');

		var label = submitBtn.querySelector('.testimonial-form-submit-label');
		if (label) {
			label.textContent = loading ? t('testimonials.form.sending') : t('testimonials.form.submit');
		}
	}

	function updateCharCount() {
		if (!charCountEl || !quoteInput) {
			return;
		}
		var len = quoteInput.value.length;
		var minLen = getMinQuoteLength();
		var maxLen = getMaxQuoteLength();
		var hasFocus = document.activeElement === quoteInput;
		var show = hasFocus || len > 0;

		charCountEl.textContent = t('testimonials.form.charCount')
			.replace('{current}', String(len))
			.replace('{min}', String(minLen))
			.replace('{max}', String(maxLen));
		charCountEl.hidden = !show;
	}

	function validateForm() {
		var nameError = validateName(nameInput ? nameInput.value : '');
		var quoteError = validateQuote(quoteInput ? quoteInput.value : '');

		setFieldError('testimonial-name', nameError);
		setFieldError('testimonial-quote', quoteError);

		return !nameError && !quoteError;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (isSubmitting) {
			return;
		}

		setStatus(null, null);
		clearAllFieldErrors();

		if (honeypotInput && honeypotInput.value.trim()) {
			return;
		}

		if (!validateForm()) {
			var firstInvalid = form.querySelector('.is-invalid');
			if (firstInvalid) {
				firstInvalid.focus();
			}
			return;
		}

		setLoading(true);

		sendTestimonial({
			name: nameInput ? nameInput.value.trim() : '',
			quote: quoteInput ? quoteInput.value.trim() : '',
			linkedin: buildLinkedInUrl(linkedinSlugInput ? linkedinSlugInput.value : '')
		}).then(function() {
			setLoading(false);
			form.reset();
			updateCharCount();
			setStatus('success', t('testimonials.form.success'));
			statusEl.focus();
		}).catch(function(err) {
			setLoading(false);
			var message = t('testimonials.form.error');
			if (err && err.message === 'endpoint_not_configured') {
				message = t('testimonials.form.errorConfig');
			}
			setStatus('error', message);
			statusEl.focus();
		});
	}

	function handleFieldBlur(event) {
		var field = event.target;
		if (field.id === 'testimonial-name') {
			setFieldError('testimonial-name', validateName(field.value));
		} else if (field.id === 'testimonial-quote') {
			setFieldError('testimonial-quote', validateQuote(field.value));
		}
	}

	function handleFieldInput(event) {
		var field = event.target;
		if (field.classList.contains('is-invalid')) {
			if (field.id === 'testimonial-name') {
				setFieldError('testimonial-name', validateName(field.value));
			} else if (field.id === 'testimonial-quote') {
				setFieldError('testimonial-quote', validateQuote(field.value));
			}
		}
		if (field.id === 'testimonial-quote') {
			updateCharCount();
		}
	}

	function isFormOpen() {
		return !!(toggleBtn && toggleBtn.getAttribute('aria-expanded') === 'true');
	}

	function setFormOpen(open) {
		if (!toggleBtn || !collapseEl) {
			return;
		}

		if (open) {
			collapseEl.hidden = false;
			toggleBtn.setAttribute('aria-expanded', 'true');
			toggleBtn.classList.add('is-open');
			window.requestAnimationFrame(function() {
				collapseEl.classList.add('is-open');
			});
			window.setTimeout(function() {
				if (nameInput && isFormOpen()) {
					nameInput.focus();
				}
			}, 180);
		} else {
			collapseEl.classList.remove('is-open');
			toggleBtn.setAttribute('aria-expanded', 'false');
			toggleBtn.classList.remove('is-open');
			window.setTimeout(function() {
				if (!isFormOpen()) {
					collapseEl.hidden = true;
				}
			}, 280);
		}
	}

	function initToggle() {
		toggleBtn = document.getElementById('testimonial-form-toggle');
		collapseEl = document.getElementById('testimonial-form-collapse');

		if (!toggleBtn || !collapseEl) {
			return;
		}

		toggleBtn.addEventListener('click', function() {
			setFormOpen(!isFormOpen());
		});
	}

	function refreshLabels() {
		if (!form) {
			return;
		}
		updateCharCount();
		var label = submitBtn && submitBtn.querySelector('.testimonial-form-submit-label');
		if (label && !isSubmitting) {
			label.textContent = t('testimonials.form.submit');
		}
	}

	function init() {
		form = document.getElementById('testimonial-form');
		if (!form) {
			return;
		}

		nameInput = document.getElementById('testimonial-name');
		quoteInput = document.getElementById('testimonial-quote');
		linkedinSlugInput = document.getElementById('testimonial-linkedin-slug');
		honeypotInput = document.getElementById('testimonial-website');
		submitBtn = document.getElementById('testimonial-submit');
		statusEl = document.getElementById('testimonial-form-status');
		charCountEl = document.getElementById('testimonial-quote-count');

		if (quoteInput) {
			quoteInput.setAttribute('maxlength', String(getMaxQuoteLength()));
		}

		initToggle();

		form.addEventListener('submit', handleSubmit);

		[nameInput, quoteInput, linkedinSlugInput].forEach(function(input) {
			if (input) {
				input.addEventListener('blur', handleFieldBlur);
				input.addEventListener('input', handleFieldInput);
			}
		});

		if (quoteInput) {
			quoteInput.addEventListener('focus', updateCharCount);
			quoteInput.addEventListener('blur', updateCharCount);
		}

		refreshLabels();
	}

	document.addEventListener('DOMContentLoaded', init);

	return {
		refreshLabels: refreshLabels
	};
})();

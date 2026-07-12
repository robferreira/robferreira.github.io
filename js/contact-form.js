var ContactForm = (function() {
    var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var form;
    var nameInput;
    var emailInput;
    var messageInput;
    var honeypotInput;
    var submitBtn;
    var statusEl;
    var charCountEl;
    var isSubmitting = false;

    function t(key) {
        return typeof I18n !== 'undefined' ? I18n.t(key) : key;
    }

    function getConfig() {
        return window.CONTACT_FORM_CONFIG || {};
    }

    function getMinMessageLength() {
        var config = getConfig();
        return config.minMessageLength || 20;
    }

    /**
     * Envia a mensagem de contato para o serviço configurado (Formspree ou Web3Forms).
     * Configure o endpoint em js/config/contact.config.js
     */
    function sendContactMessage(data) {
        var config = getConfig();
        var endpoint = config.endpoint;

        if (!endpoint || endpoint.indexOf('SEU_FORM_ID') !== -1) {
            return Promise.reject(new Error('endpoint_not_configured'));
        }

        var body;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (config.provider === 'web3forms') {
            if (!config.accessKey) {
                return Promise.reject(new Error('endpoint_not_configured'));
            }
            body = {
                access_key: config.accessKey,
                name: data.name || '',
                email: data.email,
                message: data.message,
                subject: 'Contato — robferreira.github.io'
            };
        } else {
            body = {
                name: data.name || '',
                email: data.email,
                message: data.message,
                _subject: 'Contato — robferreira.github.io'
            };
        }

        return fetch(endpoint, {
            method: 'POST',
            headers: headers,
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

    function validateEmail(value) {
        if (!value || !value.trim()) {
            return 'contact.form.errors.emailRequired';
        }
        if (!EMAIL_REGEX.test(value.trim())) {
            return 'contact.form.errors.emailInvalid';
        }
        return null;
    }

    function validateMessage(value) {
        var minLen = getMinMessageLength();
        if (!value || !value.trim()) {
            return 'contact.form.errors.messageRequired';
        }
        if (value.trim().length < minLen) {
            return 'contact.form.errors.messageTooShort';
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
            errorEl.textContent = t(errorKey).replace('{min}', String(getMinMessageLength()));
            errorEl.hidden = false;
        } else {
            input.classList.remove('is-invalid');
            input.removeAttribute('aria-invalid');
            errorEl.textContent = '';
            errorEl.hidden = true;
        }
    }

    function clearAllFieldErrors() {
        setFieldError('contact-email', null);
        setFieldError('contact-message', null);
    }

    function setStatus(type, message) {
        if (!statusEl) {
            return;
        }
        statusEl.className = 'contact-status';
        statusEl.hidden = true;
        statusEl.textContent = '';

        if (!type || !message) {
            statusEl.setAttribute('aria-live', 'off');
            return;
        }

        statusEl.classList.add('contact-status--' + type);
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

        var label = submitBtn.querySelector('.contact-submit-label');
        if (label) {
            label.textContent = loading ? t('contact.form.sending') : t('contact.form.submit');
        }
    }

    function updateCharCount() {
        if (!charCountEl || !messageInput) {
            return;
        }
        var len = messageInput.value.length;
        var minLen = getMinMessageLength();
        var hasFocus = document.activeElement === messageInput;
        var show = hasFocus || len > 0;

        charCountEl.textContent = t('contact.form.charCount')
            .replace('{current}', String(len))
            .replace('{min}', String(minLen));
        charCountEl.hidden = !show;
    }

    function validateForm() {
        var emailError = validateEmail(emailInput ? emailInput.value : '');
        var messageError = validateMessage(messageInput ? messageInput.value : '');

        setFieldError('contact-email', emailError);
        setFieldError('contact-message', messageError);

        return !emailError && !messageError;
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

        sendContactMessage({
            name: nameInput ? nameInput.value.trim() : '',
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        }).then(function() {
            setLoading(false);
            form.reset();
            updateCharCount();
            setStatus('success', t('contact.form.success'));
            statusEl.focus();
        }).catch(function(err) {
            setLoading(false);
            var message = t('contact.form.error');
            if (err && err.message === 'endpoint_not_configured') {
                message = t('contact.form.errorConfig');
            }
            setStatus('error', message);
            statusEl.focus();
        });
    }

    function handleFieldBlur(event) {
        var field = event.target;
        if (field.id === 'contact-email') {
            setFieldError('contact-email', validateEmail(field.value));
        } else if (field.id === 'contact-message') {
            setFieldError('contact-message', validateMessage(field.value));
        }
    }

    function handleFieldInput(event) {
        var field = event.target;
        if (field.classList.contains('is-invalid')) {
            if (field.id === 'contact-email') {
                setFieldError('contact-email', validateEmail(field.value));
            } else if (field.id === 'contact-message') {
                setFieldError('contact-message', validateMessage(field.value));
            }
        }
        if (field.id === 'contact-message') {
            updateCharCount();
        }
    }

    function refreshLabels() {
        if (!form) {
            return;
        }
        updateCharCount();
        var label = submitBtn && submitBtn.querySelector('.contact-submit-label');
        if (label && !isSubmitting) {
            label.textContent = t('contact.form.submit');
        }
    }

    function init() {
        form = document.getElementById('contact-form');
        if (!form) {
            return;
        }

        nameInput = document.getElementById('contact-name');
        emailInput = document.getElementById('contact-email');
        messageInput = document.getElementById('contact-message');
        honeypotInput = document.getElementById('contact-website');
        submitBtn = document.getElementById('contact-submit');
        statusEl = document.getElementById('contact-form-status');
        charCountEl = document.getElementById('contact-message-count');

        form.addEventListener('submit', handleSubmit);

        [nameInput, emailInput, messageInput].forEach(function(input) {
            if (input) {
                input.addEventListener('blur', handleFieldBlur);
                input.addEventListener('input', handleFieldInput);
            }
        });

        if (messageInput) {
            messageInput.addEventListener('focus', updateCharCount);
            messageInput.addEventListener('blur', updateCharCount);
        }

        refreshLabels();
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        sendContactMessage: sendContactMessage,
        refreshLabels: refreshLabels
    };
})();

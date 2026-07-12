/**
 * Configuração do formulário de contato.
 *
 * Formspree (padrão):
 * 1. Crie uma conta em https://formspree.io
 * 2. Crie um novo formulário e copie o endpoint (ex.: https://formspree.io/f/xxxxxxxx)
 * 3. Cole o endpoint abaixo em `endpoint`
 *
 * Web3Forms (alternativa):
 * provider: 'web3forms',
 * endpoint: 'https://api.web3forms.com/submit',
 * accessKey: 'SUA_ACCESS_KEY'
 */
window.CONTACT_FORM_CONFIG = {
    provider: 'formspree',
    endpoint: 'https://formspree.io/f/xnjearrp',
    minMessageLength: 20
};

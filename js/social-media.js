var listSocialMedia = [
    {
        name: 'Instagram',
        icon: 'ion-logo-instagram',
        link: 'http://link.robinsonferreira.com.br/instagram',
        target: '_blank'
    },
    {
        name: 'Youtube',
        icon: 'ion-logo-youtube',
        link: 'http://link.robinsonferreira.com.br/youtube',
        target: '_blank'
    },
    {
        name: 'Linkedin',
        icon: 'ion-logo-linkedin',
        link: 'https://link.robinsonferreira.com.br/linkedIn',
        target: '_blank'
    },
    {
        name: 'Github',
        icon: 'ion-logo-github',
        link: 'http://link.robinsonferreira.com.br/github',
        target: '_blank'
    }
];

function renderSocialMedia(lang) {
    var element = document.getElementById('socialMedia');
    if (!element) return;
    element.innerHTML = '';

    listSocialMedia.forEach(function(media) {
        var name = media.name;
        var link = media.link;
        var target = media.target;
        var inner = '';

        if (media.icon) {
            inner = '<i class="ion ' + media.icon + '"></i>';
        } else if (media.svg) {
            inner = media.svg;
        }

        var el = '<a class="social-link" href="' + link + '" target="' + target + '" rel="noopener noreferrer" aria-label="' + name + '">' + inner + '</a>';
        element.innerHTML += el;
    });
}

var mediumSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 12L24 22.6V24h-5.5l-7.2-7.2L5.5 24H0v-1.4L10.6 12 0 1.4V0h5.5l7.2 7.2L18.5 0H24v1.4L13.4 12z"/></svg>';

var listSocialMedia = [
    {
        name: 'Instagram',
        icon: 'ion-logo-instagram',
        link: 'https://bit.ly/33Y98fu',
        target: '_blank'
    },
    {
        name: 'Youtube',
        icon: 'ion-logo-youtube',
        link: 'https://bit.ly/3j1yAHw',
        target: '_blank'
    },
    {
        name: 'Linkedin',
        icon: 'ion-logo-linkedin',
        link: 'https://bit.ly/3cubLK6',
        target: '_blank'
    },
    {
        name: 'Medium',
        svg: mediumSvg,
        link: 'https://bit.ly/3kISWFU',
        target: '_blank'
    },
    {
        name: 'Github',
        icon: 'ion-logo-github',
        link: 'https://bit.ly/3cp5U8G',
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

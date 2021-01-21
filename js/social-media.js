//Json Object
var pathImgs = 'images/social_media/';

var listSocialMedia = [{
    name: 'Instagram',
    img: pathImgs + 'instagram.png',
    link: 'https://bit.ly/33Y98fu',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Youtube',
    img: pathImgs + 'youtube.png',
    link: 'https://bit.ly/3j1yAHw',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Linkedin',
    img: pathImgs + 'linkedin.png',
    link: 'https://bit.ly/3cubLK6',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Medium',
    img: pathImgs + 'medium.png',
    link: 'https://bit.ly/3kISWFU',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Github',
    img: pathImgs + 'github.png',
    link: 'https://bit.ly/3cp5U8G',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Bar',
    img: pathImgs + 'bar.png',
    link: '',
    target: '',
    tooltip: '',
    width: '20',
    height: '20'
}, {
    name: 'Visualizar/baixar Curriculo',
    img: pathImgs + 'curriculum-vitae.png',
    link: '#contact-section',
    target: '_blank',
    tooltip: 'tooltip',
    width: '30',
    height: '30'
}, {
    name: 'Visualizar/baixar Profile',
    img: pathImgs + 'headhunting.png',
    link: 'https://bit.ly/profile-jose-robinson',
    target: '_blank',
    tooltip: 'tooltip',
    width: '30',
    height: '30'
}];

var element = document.getElementById('socialMedia');

listSocialMedia.forEach(function(media) {
    var name = media.name;
    var img = media.img;
    var link = media.link;
    var target = media.target;
    var tooltip = media.tooltip;
    var width = media.width;
    var height = media.height;

    var href = link ? 'href="' + link + '"' : 'id=""';

    el = '<a class="navbar-brand" ' + href + ' target="' + target + '" class="btn btn-secondary" data-toggle="' + tooltip + '" data-placement="bottom" title="' + name + '"><img src="' + img + '" alt="Instagram" width="' + width + '" height="' + height + '"></a>'
    element.innerHTML += el;
});
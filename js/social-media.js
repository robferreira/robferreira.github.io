//Json Object

var listSocialMedia = [{
    name: 'Instagram',
    img: 'images/social_media/instagram.png',
    link: 'https://bit.ly/33Y98fu',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Youtube',
    img: 'images/social_media/youtube.png',
    link: 'https://bit.ly/3j1yAHw',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Linkedin',
    img: 'images/social_media/linkedin.png',
    link: 'https://bit.ly/3cubLK6',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Medium',
    img: 'images/social_media/medium.png',
    link: 'https://bit.ly/3kISWFU',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Github',
    img: 'images/social_media/github.png',
    link: 'https://bit.ly/3cp5U8G',
    target: '_blank',
    tooltip: 'tooltip',
    width: '20',
    height: '20'
}, {
    name: 'Bar',
    img: 'images/social_media/bar.png',
    link: '',
    target: '',
    tooltip: '',
    width: '20',
    height: '20'
}, {
    name: 'Visualizar/baixar Curriculo',
    img: 'images/social_media/curriculum-vitae.png',
    link: 'https://bit.ly/curriculo-jose-robinson',
    target: '_blank',
    tooltip: 'tooltip',
    width: '30',
    height: '30'
}, {
    name: 'Visualizar/baixar Profile',
    img: 'images/social_media/headhunting.png',
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
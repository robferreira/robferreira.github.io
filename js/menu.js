//Json Object

var listMenu = [{
    name: 'Home',
    link: '#home-section',
}, {
    name: 'About',
    link: '#about-section',
}, {
    name: 'Skills',
    link: '#skills-section',
}, {
    name: 'Pro. Experience',
    link: '#professional-experience',
}, {
    name: 'My Blog',
    link: '#blog-section',
}, {
    name: 'Contact',
    link: '#contact-section',
}];

var element = document.getElementById('menu');

listMenu.forEach(function(menu) {
    var name = menu.name;
    var link = menu.link;
    el = '<li class="nav-item" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation"><a href="' + link + '" class="nav-link"><span>' + name + '</span></a></li>'
    element.innerHTML += el;
});
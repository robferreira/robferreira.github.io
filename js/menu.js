var listMenuKeys = [
	{ key: 'nav.home', link: '#home-section' },
	{ key: 'nav.about', link: '#about-section' },
	{ key: 'nav.experience', link: '#professional-experience' },
	{ key: 'nav.blog', link: '#blog-section' },
	{ key: 'nav.testimonials', link: '#testimonials-section' },
	{ key: 'nav.contact', link: '#contact-section' }
];

function renderMenu(lang) {
	var element = document.getElementById('menu');

	if (!element) return;

	element.innerHTML = '';

	listMenuKeys.forEach(function(menu) {
		var name = I18n.t(menu.key);
		var link = menu.link;
		var el =
			'<li class="nav-item">' +
				'<a href="' + link + '" class="nav-link"><span>' + name + '</span></a>' +
			'</li>';

		element.innerHTML += el;
	});
}

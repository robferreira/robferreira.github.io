 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var SCROLL_OFFSET = 80;

	var burgerMenu = function() {
		var $nav = $('#ftco-nav');
		var $toggle = $('.js-fh5co-nav-toggle');

		$nav.on('show.bs.collapse', function() {
			$('body').addClass('menu-show');
			$toggle.addClass('active');
		});

		$nav.on('hide.bs.collapse', function() {
			$('body').removeClass('menu-show');
			$toggle.removeClass('active');
		});

		$('body').on('click', '.js-fh5co-nav-toggle', function(event) {
			event.preventDefault();
		});
	};
	burgerMenu();


	var onePageClick = function() {
		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');
	    var $target = $(href);

	    if (!$target.length) return;

	    $('html, body').animate({
	        scrollTop: $target.offset().top - SCROLL_OFFSET
	    }, 500);

	    if ($('#ftco-nav').hasClass('show')) {
	    	$('#ftco-nav').collapse('hide');
	    }
		});
	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});

		initPillarsScroll();
	};

	var initPillarsScroll = function() {
		var scroll = document.getElementById('pillarsScroll');
		var shell = scroll && scroll.closest('.pillars-carousel-shell');
		var dots = shell && shell.querySelector('.pillars-carousel-dots');

		if (!scroll || !dots) {
			return;
		}

		var pages = scroll.querySelectorAll('.pillars-page');
		var scrollTimer;

		function getActivePageIndex() {
			var scrollLeft = scroll.scrollLeft;
			var activeIndex = 0;
			var minDistance = Infinity;

			for (var i = 0; i < pages.length; i += 1) {
				var distance = Math.abs(pages[i].offsetLeft - scrollLeft);
				if (distance < minDistance) {
					minDistance = distance;
					activeIndex = i;
				}
			}

			return activeIndex;
		}

		function setActiveDot(index) {
			var dotButtons = dots.querySelectorAll('.pillars-carousel-dot');

			for (var i = 0; i < dotButtons.length; i += 1) {
				var isActive = i === index;
				dotButtons[i].classList.toggle('is-active', isActive);
				dotButtons[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
			}
		}

		function renderDots() {
			dots.innerHTML = '';

			for (var i = 0; i < pages.length; i += 1) {
				var button = document.createElement('button');
				button.type = 'button';
				button.className = 'pillars-carousel-dot';
				button.setAttribute('data-index', String(i));
				button.setAttribute('aria-label', 'Ir para página ' + (i + 1));
				button.addEventListener('click', function() {
					var pageIndex = Number(this.getAttribute('data-index'));
					scroll.scrollTo({
						left: pages[pageIndex].offsetLeft,
						behavior: 'smooth'
					});
				});
				dots.appendChild(button);
			}

			setActiveDot(getActivePageIndex());
		}

		function onScroll() {
			window.clearTimeout(scrollTimer);
			scrollTimer = window.setTimeout(function() {
				setActiveDot(getActivePageIndex());
			}, 80);
		}

		renderDots();
		scroll.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', function() {
			setActiveDot(getActivePageIndex());
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	  })
	  
	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

})(jQuery);
  

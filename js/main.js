document.addEventListener('DOMContentLoaded', function(){
	var isFixed = false,
	    header = document.getElementsByTagName('header')[0],
	    intro = document.getElementById('intro'),
	    introHeight = intro && introHeight.offsetHeight,
	    headerHeight = header && header.offsetHeight,
	    position = 100; //introHeight - headerHeight;

	window.addEventListener('scroll', function(){
		var top = document.documentElement.scrollTop || document.body.scrollTop;

		if (top >= position && !isFixed) {
			isFixed = true;
			header.className = 'fixed';
		}

		if (top < position && isFixed) {
			isFixed = false;
			header.className = '';
		}
	});

	// Masonry grid
	var grid = document.querySelector('.grid');
	
	if (grid) {
		var initMasonry = function () {
			new Masonry(grid, {
				columnWidth: 220,
				gutter: 20,
				itemSelector: 'li'
			});
		};

		initMasonry();

		imagesLoaded(grid, function() {
			setTimeout(initMasonry, 100);
		});
	}

	// Slides
	var pager = document.querySelector('.intro .pager');

	if (pager) {
		pager.addEventListener('click', function (e) {
			var page = e.target;

			if (page.hasAttribute('data-slide')) {
				var activeSlide = document.querySelector('.intro .slide.active'),
				    activePage = document.querySelector('.intro .pager .active'),
				    newSlide = document.querySelector(page.getAttribute('data-slide')),
				    newPage = page;

				if (newSlide) {
					activeSlide && (activeSlide.className = activeSlide.className.replace('active', ''));
					activePage && (activePage.className = activePage.className.replace('active', ''));
					newSlide && (newSlide.className += ' active');
					newPage && (newPage.className += ' active');
				}
			}
		});
	}


	// Sign in
	var enter = document.querySelector('header .enter'),
	    signinClose = document.querySelector('#signin-popup .close');

	if (enter) {
		enter.addEventListener('click', function (e) {
			e.preventDefault();
			document.body.className += ' sign-in';
		});

		signinClose.addEventListener('click', function (e) {
			e.preventDefault();
			document.body.className = document.body.className.replace('sign-in', '');
		});
	}


});
define(['../jquery', '../owl.carousel'], function ($, owl) {

	var CAROUSEL_SELECTOR = '.ui-carousel',
		NAVIGATION_CONTAINER = '.ui-navigation-container';
	
	return {
		initialise: function () {
			var carousel = $(CAROUSEL_SELECTOR);
			$(CAROUSEL_SELECTOR).owlCarousel({
				items: 2,
				itemsDesktop : [1199, 2],
		        itemsDesktopSmall : [940, 1],
		        itemsTablet : false,
		        itemsTabletSmall : false,
				itemsMobile : false,
				pagination: false,
				rewindNav: false
			});

			$(".ui-carousel-next").click(function () {
				var carousel = $(this).attr('data-target');
				$(carousel).trigger('owl.next');
			});

			$(".ui-carousel-prev").click(function () {
				var carousel = $(this).attr('data-target');
				$(carousel).trigger('owl.prev');
			});

			$(window).keydown(function (event) {
				var selected = $(NAVIGATION_CONTAINER).attr('data-selected'),
					carousel = $('#' + selected + ' ' + CAROUSEL_SELECTOR);

				if (carousel.length > 0) {
					switch (event.which) {
						case 37: // LEFT ARROW
							$(carousel).trigger('owl.prev');
							break;
						case 39: // RIGHT ARROW
							$(carousel).trigger('owl.next');
							break;
						default: 
							break;
					}
				}
			});
			
		}
	};
});
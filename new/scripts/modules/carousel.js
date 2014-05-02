define(['../jquery', '../owl.carousel'], function ($, owl) {

	var CAROUSEL_SELECTOR = '.ui-carousel',
		NAVIGATION_CONTAINER = '.ui-navigation-container';

	function afterMoveCallback (elem) {
		var node = $(elem),
			id = elem.attr('id'),
			controls = $('.ui-carousel-controls').filter('[data-target="#' + id + '"]'),
			children = controls.children();

		children.removeClass('is-disabled');

		if (this.currentItem >= this.maximumItem) {
			children.filter('.ui-carousel-next').addClass('is-disabled');
		}
		else if (this.currentItem <= 0) {
			children.filter('.ui-carousel-prev').addClass('is-disabled');
		}
	}
	
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
				rewindNav: false,
				mouseDrag: false,
				afterMove: afterMoveCallback
			});

			$(".ui-carousel-controls").on('click', 'a', function (event) {
				var carouselSelector = $(event.delegateTarget).attr('data-target'),
					direction = $(event.currentTarget).attr('data-direction'),
					carousel = $(carouselSelector);

				if (direction && carousel.length > 0) {
					carousel.trigger('owl.' + direction);
				}
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
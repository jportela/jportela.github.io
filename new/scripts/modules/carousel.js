define(['../jquery', '../owl.carousel'], function ($, owl) {

	var CAROUSEL_SELECTOR = '.ui-carousel'
	
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
				pagination: false
			});

			$(".ui-carousel-next").click(function () {
				var carousel = $(this).attr('data-target');
				$(carousel).trigger('owl.next');
			});

			$(".ui-carousel-prev").click(function () {
				var carousel = $(this).attr('data-target');
				$(carousel).trigger('owl.prev');
			});
			
		}
	}
});
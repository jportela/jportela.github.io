// Scroll based navigation

define(['../../jquery',  '../../jquery.mousewheel.min'], function ($, mousewheel) {
	var SCROLL_SENSITIVITY = 70,
		SCROLL_DELAY = 100,
		scrollAccumulator = 0,
		scrollTimer,
		host;

	return {
		install: function (hostModule) {
			var deltaY = 0,
				self = this;

			host = hostModule;

			$(window).mousewheel(function (event) {

				event.preventDefault();

				if (host.isAnimating()) {
					return;
				}

				//direction changed
				if (deltaY !== 0 && deltaY !== event.deltaY) {
					self.resetScrollTimer();
				}

				scrollAccumulator += event.deltaY * event.deltaFactor;

				if (!scrollTimer) {
					scrollTimer = window.setTimeout(function () { 
						self.executeScroll();
					}, SCROLL_DELAY);
				}
			});
		},

		executeScroll: function () {
			if (scrollAccumulator > SCROLL_SENSITIVITY) {
				host.navigateToPrevious();
			}
			else if (scrollAccumulator < -SCROLL_SENSITIVITY) {
				host.navigateToNext();
			}

			scrollAccumulator = 0;
			scrollTimer = null;
		},

		resetScrollTimer: function () {
			scrollAccumulator = 0;
			if (scrollTimer) {
				window.clearTimeout(scrollTimer);
			}
		},
	};

});
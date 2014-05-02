// Keyboard based navigation
define(['../../jquery'], function ($) {
	return {
		install: function (host) {
			var self = this;
			$(window).keydown(function (event) {
				if (host.isAnimating()) {
					return;
				}
				switch (event.which) {
					case 38: // UP ARROW
						host.navigateToPrevious();
						break;
					case 40: // DOWN ARROW
						host.navigateToNext();
						break;
					default: 
						break;
				}
			});
		}
	};
});
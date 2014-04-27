define(['../jquery',  '../modules/hook', '../modules/navigation/scroll', '../modules/navigation/keyboard', '../jquery.transit'], function ($, hook, scroll, keyboard, transit) {
	var NAVIGATION_SELECTOR = '.ui-navigation',
		NAVIGATION_CONTAINER_SELECTOR = '.ui-navigation-container',
		NAVIGATION_DURATION = 800,
		_isAnimating = false;	// animation mutex
		
	return {
		initialise: function () {
			this.installHandler();
			scroll.install(this);
			keyboard.install(this);
		},

		navigateBySelector: function (selector) {
			var node = selector ? $(selector) : null;
			this.navigate(node);
		},

		navigate: function (node) {
			var container = $(NAVIGATION_CONTAINER_SELECTOR),
				self = this,
				id,
				navigationLinks,
				pos;
			if (container.length && node.length) {
				id = node.attr('id');

				if (container.attr('data-selected') === id) {
					return;
				}

				pos = '-' + node.css('top');
				
				_isAnimating = true;

				navigationLinks = $(NAVIGATION_SELECTOR + ' a');

				navigationLinks.removeClass('is-selected');
				
				scroll.resetScrollTimer();

				navigationLinks.filter('[href=#' + id + ']').addClass('is-selected');

				container.transition({
						y: pos
					}, 
					NAVIGATION_DURATION, 
					function () {
						self.onNavigationEnd(container, node);
				});
			}
		},

		goToSelectedNode: function () {
			var container = $(NAVIGATION_CONTAINER_SELECTOR),
				node = $('#' + container.attr('data-selected'));

			pos = '-' + node.css('top');

			container.css({
				y: pos
			});
		},

		onNavigationEnd: function (container, node) {
			var id = node.attr('id');

			_isAnimating = false;

			container.attr('data-selected', id);

			if (node.length && node.hasClass('ui-navigation-hook')) {
				var data = node.data()
				hook.executeHook(data.hook, data);
			}
		},

		installHandler: function () {
			var self = this;
			$(NAVIGATION_SELECTOR).on('click', 'a', function (event) {
				var location = $(this).attr('href');
				
				event.preventDefault();

				self.navigateBySelector(location);
			});

			$(window).resize(function () {
				self.goToSelectedNode();
			});
		},

		navigateToNext: function () {
			var container = $(NAVIGATION_CONTAINER_SELECTOR),
				node = $('#' + container.attr('data-selected'));
			
			if (node.next()) {
				this.navigate(node.next());
			}
		},

		navigateToPrevious: function () {
			var container = $(NAVIGATION_CONTAINER_SELECTOR),
				node = $('#' + container.attr('data-selected'));
			
			if (node.prev()) {
				this.navigate(node.prev());
			}
		},

		isAnimating: function () {
			return _isAnimating;
		}

	}
});
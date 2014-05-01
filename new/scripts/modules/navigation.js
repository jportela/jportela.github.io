define(['../jquery',  '../modules/hook', '../modules/navigation/scroll', '../modules/navigation/keyboard', '../jquery.transit', '../jquery.touchSwipe.min'], function ($, hook, scroll, keyboard, transit, touchswipe) {
	var NAVIGATION_SELECTOR = '.ui-navigation',
		NAVIGATION_CONTAINER_SELECTOR = '.ui-navigation-container',
		HOME_LINK = 'home',
		NAVIGATION_DURATION = 800,
		_isAnimating = false;	// animation mutex
		
	return {
		initialise: function () {
			this.initialiseLocation();
			this.installHandler();
			scroll.install(this);
			keyboard.install(this);
		},

		initialiseLocation: function (forceHome) {
			var hash = window.location.hash,
				container = $(NAVIGATION_CONTAINER_SELECTOR),
				node,
				id;
			if (forceHome || hash) {

				node = $(hash || ('#' + HOME_LINK));
				if (node.length > 0) {
					id = node.attr('id');
					container.attr('data-selected', id);
					this.goToNode(node);
					this.updateMenu(id);
					this.executeNavigationHook(node);
				}
			}
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

				scroll.resetScrollTimer();

				this.updateMenu(id);

				container.transition({
						y: pos
					}, 
					NAVIGATION_DURATION, 
					function () {
						self.onNavigationEnd(container, node);
				});
			}
		},

		updateMenu: function (id) {
			var navigationLinks = $(NAVIGATION_SELECTOR + ' a');

			navigationLinks.removeClass('is-selected');
			navigationLinks.filter('[href=#' + id + ']').addClass('is-selected');
		},

		goToNode: function (node) {
			var container = $(NAVIGATION_CONTAINER_SELECTOR);

			pos = '-' + node.css('top');

			container.css({
				y: pos
			});
		},

		goToSelectedNode: function () {
			var container = $(NAVIGATION_CONTAINER_SELECTOR),
				node = $('#' + container.attr('data-selected'));

			this.goToNode(node);
		},

		onNavigationEnd: function (container, node) {
			var id = node.attr('id');

			container.attr('data-selected', id);

			_isAnimating = false;

			this.updateLocation(id);
			this.executeNavigationHook(node);
		},

		updateLocation: function (id) {
			if (window.history.pushState) {
				if (id === HOME_LINK) {
					window.history.pushState(null, null, "index.html");	
				}
				else {
                	window.history.pushState(null, null, "#" + id);
            	}
            }
		},

		executeNavigationHook: function (node) {
			var data = node.data();;
			if (node.hasClass('ui-navigation-hook')) {
				hook.executeHook(data.hook, data);
			}
		},

		installHandler: function () {
			var self = this;
			$(NAVIGATION_SELECTOR).on('click', 'a', function (event) {
				var location = $(this).attr('href');
				
				event.preventDefault();

				if (!_isAnimating) {
					self.navigateBySelector(location);
				}
			});

			$(window).resize(function () {
				self.goToSelectedNode();
			});

			$(window).swipe({
				swipeUp: function(event, direction, distance, duration, fingerCount) {
					self.navigateToNext();
				},
				swipeDown: function(event, direction, distance, duration, fingerCount) {
					self.navigateToPrevious();
				}
			});

			$(window).on('popstate', function () {
				event.preventDefault();
				self.initialiseLocation(true);
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
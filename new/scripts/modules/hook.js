define(['../jquery'], function ($) {
	var HOOK_SELECTOR = '.ui-hook',
		DELEGATION_SELECTOR = 'body',
		hooks = {
			'add-class': function (data) {
				var node = $(data.target),
					className = data.name;
				if (node.length && className) {
					node.addClass(className);
				}
			},
			'remove-class': function (data) {
				var node = $(data.target),
					className = data.name;
				if (node.length && className) {
					node.removeClass(className);
				}
			}
		};

	return {
		initialise: function () {
			this.installHandler();
		},

		executeHook: function (hook, data) {
			var registeredHook = hooks[hook];

			if (registeredHook) {
				registeredHook(data);
			}
		},

		installHandler: function () {
			var self = this;
			$(DELEGATION_SELECTOR).on('click', HOOK_SELECTOR, function (event) {
				var data = $(this).data();
				self.executeHook(data.hook, data);
			});
		}
	}
});
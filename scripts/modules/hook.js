/**
 * 	Defines interactive hooks for triggering certain interactions
 *
 */
define(['../jquery'], function ($) {
	var HOOK_SELECTOR = '.ui-hook',
		DELEGATION_SELECTOR = 'body',
		hooks = {
			// adds a class by setting data-target and data-name
			'add-class': function (data) {
				var node = $(data.target),
					className = data.name;
				if (node.length && className) {
					node.addClass(className);
				}
			},
			// removes a class by setting data-target and data-name
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

		//click handler for the hooks
		installHandler: function () {
			var self = this;
			$(DELEGATION_SELECTOR).on('click', HOOK_SELECTOR, function (event) {
				var data = $(this).data();
				self.executeHook(data.hook, data);
			});
		}
	};
});
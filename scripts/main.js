define(['jquery', 'modules/navigation', 'modules/hook', 'modules/carousel'], function ($, nav, hook, carousel) {
    $(document).ready(function () {
    	if ($('html').hasClass('ua-lt-ie9') === false) {
        	nav.initialise();
        }
        hook.initialise();
        carousel.initialise();
    });
});
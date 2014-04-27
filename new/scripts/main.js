define(['jquery', 'modules/navigation', 'modules/hook', 'modules/carousel'], function ($, nav, hook, carousel) {
    $(document).ready(function () {
        nav.initialise();
        hook.initialise();
        carousel.initialise();
    });
});
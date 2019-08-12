const $ = require('jquery');
$(document).on('ready', function () {
    $('.nav-menu__toggle-menu-button').on('click', function () {
        $('.nav-menu__list').toggleClass('nav-menu__list--active')
    });
});

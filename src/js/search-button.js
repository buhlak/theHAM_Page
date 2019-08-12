const $ = require('jquery');
$(document).on('ready', function () {
    // animate search input, open/close logic
    const searchWrap = $('.header__search');
    const search = $('.search__input');
    const closeButton = $('.search__close-button');
    const searchButton = $('.search__search-button');
    $(searchWrap).on('click', function (event) {
        $(search).addClass('search__input--active');
        $(event.target).hasClass('search__close-button') ? $(search).removeClass('search__input--active') : null;
        if ($(search).hasClass('search__input--active')) {
            $(closeButton).css('display', 'flex');
            $(searchButton).css('display', 'flex');
        } else {
            $(closeButton).css('display', 'none');
            $(searchButton).css('display', 'none');
        }
    });
});


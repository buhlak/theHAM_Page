const $ = require('jquery');
$(document).on('ready', function () {
    $(document).on('click', function (event) {
        let target = {};
        // check and assign target depends on children or parent elem clicked
        $(event.target).hasClass('services-about__item-title')
            ? target = event.target
            : $(event.target).hasClass('services-about__title-text')
            ? target = $(event.target).parent().get(0)
            : null;
        if ($(target).hasClass('services-about__item-title')) {
            $('.services-about__item-title').each(function (index, elem) {
                $(elem).removeClass('services-about__item-title--active');
            });
            $('.services-about__item-description').each(function (index, elem) {
                $(elem).removeClass('services-about__item-description--active')
            });
            $(target).addClass('services-about__item-title--active');
            $(target).parent().children('.services-about__item-description').addClass('services-about__item-description--active');
        }
    });
});


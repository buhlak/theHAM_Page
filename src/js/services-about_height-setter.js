const $ = require('jquery');
$(document).on('ready', function () {

    const listBlock = $('.services-about__list')[0];
    const mainBlock = $('.our-services__about')[0];
    const descriptionBlock = $('.services-about__item-description--active')[0];
    // set height to adaptive
    function setHeight(obj) {
        $(mainBlock).height(function () {
            return (obj.descriptionHeight + obj.menuListBlock) + 100;
        });
    }

    function getHeight() {
        let obj = {
            menuListBlock: $(listBlock).outerHeight(),
            descriptionHeight: $(descriptionBlock).outerHeight()

        };
        setHeight(obj);
    }

    $(window).on('resize', function () {
        getHeight();
    });
    getHeight();
});

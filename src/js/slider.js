const $ = require('jquery');
$(document).on('ready', function () {

    const sliderMenuList = $('.slider__menu-list');
    const leftButton = 'slider__control-button--left-button';
    const rightButton = 'slider__control-button--right-button';

    let sliderItemImg = {};
    let imgArr = [];
    let dataArr = [];
    const rightOffset = $(sliderMenuList).css('right');
// create slider block elems
    function createListItemPhoto() {
        let listItemCollectionForAdding = $();
        for (let i = 0; i < 6; i++) {
            listItemCollectionForAdding = listItemCollectionForAdding.add(
                $('<li>', {
                    class: 'slider__list-item'
                }).append($('<img>', {
                    class: 'slider__item-photo'
                }))
            );
        }
        return listItemCollectionForAdding
    }
// append content to fields
    function appendContent(targetObject) {
        $('.feedback__text').text(targetObject[0].feedback);
        $('.feedback__name').text(targetObject[0].name);
        $('.feedback__profession').text(targetObject[0].role);
        $('.feedback__person-photo').attr('src', targetObject[0].photo);
    }
// check equal activeElem src in dataArr
    function changeContentToAppend(activeElem) {
        return $.map(dataArr, function (val) {
            if ($(activeElem).attr('src') === val.photo) {
                return val;
            }
        });
    }
// universal function to add --active modificator to class(on small screen, add active modificator on one static elem
    function toggleClassActive(elemClass, target) {
        let classActive = elemClass + '--active';
        $('.' + elemClass).removeClass(classActive);
        if (target) {
            return $(target).addClass(classActive);
        } else {
            return $('.' + elemClass).eq(1).addClass(classActive);
        }
    }

    $.getJSON('./src/slider-data.json', function (data) {
        dataArr = data;
        $.map(data, function (val) {
            imgArr.push(val.photo);
        })
    }).done(function () {
        $(sliderMenuList).append(createListItemPhoto(imgArr));
    }).done(function () {
        sliderItemImg = $('.slider__item-photo');
        $(sliderItemImg).each(function (i, elem) {
            $(elem).attr('src', imgArr[i]);
        });
        appendContent(changeContentToAppend(toggleClassActive('slider__item-photo')));
    }).done(function () {
        $(document).on('click', function (event) {
            let target = event.target;
            if ($(target).hasClass('slider__list-item') || $(target).hasClass('slider__item-photo')) {
                appendContent(changeContentToAppend(toggleClassActive('slider__item-photo', target)));
            } else if ($(target).hasClass(rightButton)) {
                $(sliderMenuList).animate({
                    right: 230
                }, 800, function () {
                    $(sliderMenuList).css('right', rightOffset).stop(true);
                    // infinity scroll logic
                    $(sliderItemImg).each(function (i, elem) {
                        for (let j = 0; j < imgArr.length; j++) {
                            if ($(elem).attr('src') === imgArr[j]) {
                                if (imgArr[j + 1]) {
                                    $(elem).attr('src', imgArr[j + 1]);
                                } else {
                                    $(elem).attr('src', imgArr[0])
                                }
                                break;
                            }
                        }
                    });
                    appendContent(changeContentToAppend($('.slider__item-photo--active')));
                });
            } else if ($(target).hasClass(leftButton)) {
                $(sliderMenuList).animate({
                    right: -10
                }, 800, function () {
                    $(sliderMenuList).css('right', rightOffset).stop(true);
                    // infinity scroll logic
                    $(sliderItemImg).each(function (i, elem) {
                        for (let j = 0; j < imgArr.length; j++) {
                            if ($(elem).attr('src') === imgArr[j]) {
                                if (imgArr[j - 1]) {
                                    $(elem).attr('src', imgArr[j - 1]);
                                } else {
                                    $(elem).attr('src', imgArr[imgArr.length - 1])
                                }
                                break;
                            }
                        }
                    });
                    appendContent(changeContentToAppend($('.slider__item-photo--active')));
                });
            }
        });
    });


    // resize slider for small screen
    let flagCheckWidth = true;
    function checkWidth() {
        if ($(window).outerWidth() <= 690 && flagCheckWidth === true) {
            flagCheckWidth = false;
            appendContent(changeContentToAppend(toggleClassActive('slider__item-photo')));
        }

        if ($(window).outerWidth() >= 690 && flagCheckWidth === false) {
            flagCheckWidth = true;
        }
    }

    $(window).on('resize', checkWidth
    );
});

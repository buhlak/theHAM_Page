const $ = require('jquery');
$(document).on('ready', function () {

    const photoGallery = $('#gallery-photo-list');
    const menuList = $('#gallery-menu-list');
    const loadButton = $('#gallery-load-button');
    let obj = {};

    function constructObjFromJson(data) {
        data.forEach(function (elem) {
            obj[elem.category] = [];
        });
        data.forEach(function (elem) {
            for (let key in obj) {
                if (key === elem.category) {
                    obj[key].push(elem);
                }
            }
        });
    }

    function stringRebuild(value) {
        return value.split('-').join(' ');
    }

    function createDomElementsObject(categoryArr) {
        return $.map(categoryArr, function (value) {
            return (
                $('<li>', {
                    class: 'gallery__photo-item'
                })
                    .append($('<img>', {
                        src: value.path,
                        class: 'gallery__img'
                    }))
                    .append($('<section>', {
                            class: 'drop-down-panel'
                        })
                            .append($('<div>', {
                                class: 'drop-down-panel__icon-wrap'
                            })
                                .append($('<a>', {
                                    href: '#!',
                                    class: 'drop-down-panel__icon drop-down-panel__icon--link-icon'
                                }))
                                .append($('<a>', {
                                    href: '#!',
                                    class: 'drop-down-panel__icon drop-down-panel__icon--search-icon'
                                })))
                            .append($('<h6>', {
                                class: 'drop-down-panel__title',
                                text: 'creative design'
                            }))
                            .append($('<p>', {
                                class: 'drop-down-panel__category',
                                text: stringRebuild(value.category)
                            }))
                    )
            );
        })
    }

// show elements depends on screen width
    function shownElements() {
        if (getDocumentWidth() >= 992) {
            $('.gallery__photo-item:not(.gallery__photo-item--active)').addClass(function (index) {
                return index < 6 ? 'gallery__photo-item--active' : null;
            });
        } else if (getDocumentWidth() >= 768) {
            $('.gallery__photo-item:not(.gallery__photo-item--active)').addClass(function (index) {
                return index < 4 ? 'gallery__photo-item--active' : null;
            });
        } else {
            $('.gallery__photo-item:not(.gallery__photo-item--active)').addClass(function (index) {
                return index < 3 ? 'gallery__photo-item--active' : null;
            });
        }
    }

// disable/enable button loading more photos
    function toggleActiveButton(color) {
        $(loadButton).css('background-color', color);
    }

// checking, if more photos to loading have
    function haveMoreElems() {
        $('.gallery__photo-item:not(.gallery__photo-item--active)').length < 1 ? toggleActiveButton('#b8b8b8') : toggleActiveButton('#18cfab');
    }

    function getDocumentWidth() {
        return $(document).width();
    }

    function toggleLoadAnimation() {
        $('.gallery__photo-item').remove();
        $('.gallery__loader-animation').css('display', 'flex');
    }

// jq hover
    function hoverDropDownPanel() {
        $('.gallery__photo-item').hover(function () {
            $(this).children('.drop-down-panel').addClass('drop-down-panel--active');

        }, function () {
            $(this).children('.drop-down-panel').removeClass('drop-down-panel--active');
        });
    }

    function appendingElements(removeContentsElem, appendToElem, elemsAppend) {
        $(removeContentsElem).remove();
        $(appendToElem).append(elemsAppend);
    }

// multi call function
    function shownElementsHoverDropDownPanelHaveMoreElems() {
        shownElements();
        hoverDropDownPanel();
        haveMoreElems();
    }

// ckecking, if this elem target, or child of target
    function determineParentSingleChildElement(target) {
        if ($(target).children().length > 0) {
            return target
        } else {
            return $(target).parent()
        }
    }

// universal function to add --active modificator to class
    function toggleClassActive(elemClass, target) {
        let classActive = elemClass + '--active';
        $('.' + elemClass).removeClass(classActive);
        $(target).addClass(classActive);
    }

    $.getJSON('./src/gallery-data.json', function (data) {
        $(photoGallery).append(createDomElementsObject(data));
        hoverDropDownPanel()
    }).done(function (data) {
        constructObjFromJson(data);
        shownElements();
        toggleClassActive('gallery__menu-item', $('.gallery__menu-item').eq(0))
    }).done(function (data) {
            $(menuList).on('click', function (event) {
                let target = event.target;
                $(target).hasClass('gallery__menu-item') || $(target).hasClass('gallery__item-text') ? toggleClassActive('gallery__menu-item', determineParentSingleChildElement(target)) : null;
                setTimeout(
                    function () {
                        const menuItemPhoto = $('.gallery__photo-item');
                        $('.gallery__loader-animation').css('display', 'none');
                        hoverDropDownPanel();
                        switch ($(target).attr('id')) {
                            case 'all':
                                appendingElements(menuItemPhoto, photoGallery, createDomElementsObject(data));
                                shownElementsHoverDropDownPanelHaveMoreElems();
                                break;
                            case 'graphic-design':
                                appendingElements(menuItemPhoto, photoGallery, createDomElementsObject(obj['graphic-design']));
                                shownElementsHoverDropDownPanelHaveMoreElems();
                                break;
                            case 'web-design':
                                appendingElements(menuItemPhoto, photoGallery, createDomElementsObject(obj['web-design']));
                                shownElementsHoverDropDownPanelHaveMoreElems();
                                break;
                            case 'landing-pages':
                                appendingElements(menuItemPhoto, photoGallery, createDomElementsObject(obj['landing-pages']));
                                shownElementsHoverDropDownPanelHaveMoreElems();
                                break;
                            case 'wordpress':
                                appendingElements(menuItemPhoto, photoGallery, createDomElementsObject(obj['wordpress']));
                                shownElementsHoverDropDownPanelHaveMoreElems();
                                break;
                        }
                    }, 250);

                toggleLoadAnimation();
            });

            $(loadButton).on('click', function () {
                shownElementsHoverDropDownPanelHaveMoreElems();
            });
            hoverDropDownPanel();
        }
    );
});

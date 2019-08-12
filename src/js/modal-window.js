const $ = require('jquery');
$(document).on('ready', function () {
    // create modal block elems
    function createModalWindowDom() {
        return (
            $('<section>', {
                class: 'modal'
            })
                .append($('<div>', {
                        class: 'modal__container'
                    })
                        .append($('<article>', {
                                class: 'modal__order'
                            })
                                .append($('<h4>', {
                                    class: 'modal__title modal__title--order',
                                    text: 'Order your theme now!'
                                }))
                                .append($('<form>', {
                                        class: 'modal__form'
                                    })
                                        .append($('<input>', {
                                            class: 'modal__input modal__input--email',
                                            placeholder: 'Your mail*',
                                            type: 'email'
                                        }))
                                        .append($('<input>', {
                                            class: 'modal__input modal__input--password',
                                            placeholder: 'Your password*',
                                            type: 'password'
                                        }))
                                )
                                .append($('<a>', {
                                    class: 'button modal__button',
                                    href: '#!',
                                    text: 'Order now'
                                }))
                                .append($('<div>', {
                                        class: 'modal__option-wrap'
                                    })
                                        .append($('<label>', {
                                                class: 'checkbox modal__input-checkbox',
                                            })
                                                .append($('<span>', {
                                                        class: 'checkbox__check-wrap'
                                                    })
                                                        .append($('<input>', {
                                                            class: 'checkbox__input-elem',
                                                            type: 'checkbox'
                                                        }))
                                                        .append($('<span>', {
                                                            class: 'checkbox__check'
                                                        }))
                                                )
                                                .append($('<span>', {
                                                    class: 'checkbox__sign-text',
                                                    text: 'remember me'
                                                }))
                                        )
                                        .append($('<a>', {
                                            class: 'modal__forgot-password',
                                            href: '#!',
                                            text: 'forgot password?'
                                        }))
                                )
                        )
                        .append($('<span>', {
                            class: 'modal__design-line',
                            text: 'or'
                        }))
                        .append($('<article>', {
                                class: 'modal__subscribe'
                            })
                                .append($('<h4>', {
                                    class: 'modal__title modal__title--subscribe',
                                    text: 'Subscribe and get more options!'
                                }))
                                .append($('<section>', {
                                        class: 'modal__social-networks'
                                    })
                                        .append($('<a>', {
                                                class: 'modal__sign-in modal__sign-in--facebook',
                                                href: '#!',
                                            })
                                                .append($('<span>', {
                                                    class: 'modal__sign-in-logo modal__sign-in-logo--facebook'
                                                }))
                                                .append($('<span>', {
                                                    class: 'modal__sign-in-text modal__sign-in-text--facebook',
                                                    text: 'Sign In with Facebook'
                                                }))
                                        )
                                        .append($('<a>', {
                                                class: 'modal__sign-in modal__sign-in--twitter',
                                                href: '#!',
                                            })
                                                .append($('<span>', {
                                                    class: 'modal__sign-in-logo modal__sign-in-logo--twitter'
                                                }))
                                                .append($('<span>', {
                                                    class: 'modal__sign-in-text modal__sign-in-text--twitter',
                                                    text: 'Sign In with Twitter'
                                                }))
                                        )
                                        .append($('<a>', {
                                                class: 'modal__sign-in modal__sign-in--google',
                                                href: '#!',
                                            })
                                                .append($('<span>', {
                                                    class: 'modal__sign-in-logo modal__sign-in-logo--google'
                                                }))
                                                .append($('<span>', {
                                                    class: 'modal__sign-in-text modal__sign-in-text--google',
                                                    text: 'Sign In with Google+'
                                                }))
                                        )
                                )
                        ).append($('<span>', {
                            class: 'modal__close-button',
                        }))
                )
        )
    }

    $('body').append(createModalWindowDom());
    $(document).on('click', function (event) {
        let target = event.target;
        if ($(target).hasClass('button--modal')) {
            $('.modal').addClass('modal--active')
        }
        if ($(target).hasClass('modal__close-button') || $(target).hasClass('modal')) {
            $('.modal').removeClass('modal--active');
        }
    });
});

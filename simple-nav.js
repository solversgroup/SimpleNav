/**
 * simpleNav
 * @version 1.1.0
 */
;(function($) {

    $.fn.simpleNav = function(options) {

        var opts = $.extend(true, {
                timing : 300,
                topMargin : 0,
                menu   : {
                    list        : 'ul',
                    item        : 'li',
                    trigger     : 'a',
                    triggerHTML : '<div class="submenu-trigger"></div>'
                },
                classes : {
                    opened  : 'opened',
                    opening : 'opening',
                    active  : 'active',
                    used    : 'used',
                    has     : 'has-submenu'
                },
                attrs : {
                    opened : {
                        key    : 'opened',
                        true   : 'true',
                        false  : 'false'
                    }
                }
            }, options);

        var $menu = this;
        var $items = $menu.find(opts.menu.item);

        $.each($items, function (index, item) {

            var $item = $(item);
            var $link = $item.find('> a');

            if ($item.find('> ul').length > 0) {

                $item
                    .addClass(opts.classes.has)
                    .find('> a')
                    .after($(opts.menu.triggerHTML));

                $link.attr({
                    'aria-expanded' : $item.hasClass(opts.classes.opened),
                    'aria-haspopup' : true
                });
            }
        });


        $items.find('> ' + opts.menu.trigger).on('click', function(event) {

            event.preventDefault();

            var $link = $(this).closest(opts.menu.item).find('> ' + opts.menu.trigger);
            var $list = $(this).closest(opts.menu.item).find('> ' + opts.menu.list);

            $list.css({
                display : 'block'
            });

            if ($list.parent(opts.menu.item).hasClass(opts.classes.opened)) {

                $list.stop().animate({
                    marginTop : -($list.outerHeight(true)-opts.topMargin)
                }, opts.timing, function() {

                    $link.attr('aria-expanded', false);

                    $list
                        //.attr(opts.attrs.opened.key, opts.attrs.opened.false)
                        .addClass(opts.classes.used)
                        .parent(opts.menu.item).removeClass(opts.classes.opened);

                });

            } else {

                if (!$list.hasClass(opts.classes.used)) {
                    $list
                        .css({
                            marginTop : -($list.outerHeight(true)-opts.topMargin)
                        })
                        .addClass(opts.classes.used);
                }

                $list
                    .parent(opts.menu.item).addClass(opts.classes.opening)
                    .end()
                    .stop().animate({
                        marginTop : (0 + opts.topMargin)
                    }, opts.timing, function() {

                        $link.attr('aria-expanded', true);

                        $list
                            //.attr(opts.attrs.opened.key, opts.attrs.opened.true)
                            .parent(opts.menu.item).removeClass(opts.classes.opening)
                                .end()
                            .addClass(opts.classes.used)
                            .parent(opts.menu.item).addClass(opts.classes.opened);
                    });
            }

        });

    };

})(jQuery);

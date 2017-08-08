/**
 * simpleNav
 * @version 1.0.0-beta.1
 */
;(function($) {

  $.fn.simpleNav = function(options) {

    var settings = $.extend(true, {
        timing : 300,
        topMargin : 0,
        menu   : {
            list    : 'ul',
            item    : 'li',
            trigger : 'a'
        },
        classes : {
            opened : 'opened',
            active : 'active',
            used   : 'used'
        },
        attrs : {
            opened : {
                key    : 'opened',
                true   : 'true',
                false  : 'false'
            }
        }
    }, options);

    var $this = this;
    var $trigers = $this.find(settings.menu.list).parent(settings.menu.item).find('> ' + settings.menu.trigger);

    $trigers.on('click', function(event) {

        event.preventDefault();

        var $list = $(this).parent(settings.menu.item).find('> ' + settings.menu.list);

        $list.css({
            display:'block',
        });

        if ($list.parent(settings.menu.item).hasClass(settings.classes.opened)) {

            $list.stop().animate({
                marginTop : -($list.outerHeight(true)-settings.topMargin)
            }, settings.timing, function() {
                $list
                    .attr(settings.attrs.opened.key, settings.attrs.opened.false)
                    .addClass(settings.classes.used)
                    .parent(settings.menu.item).removeClass(settings.classes.opened);
            });

        } else {

            if (!$list.hasClass(settings.classes.used)) {
                $list
                    .css({
                        marginTop : -($list.outerHeight(true)-settings.topMargin)
                    })
                    .addClass(settings.classes.used);
            }

            $list
                .parent(settings.menu.item).addClass('opening')
                .end()
                .stop().animate({
                    marginTop : (0 + settings.topMargin)
                }, settings.timing, function() {
                    $list
                        .attr(settings.attrs.opened.key, settings.attrs.opened.true)
                        .parent(settings.menu.item).removeClass('opening')
                            .end()
                        .addClass(settings.classes.used)
                        .parent(settings.menu.item).addClass(settings.classes.opened);
                });
        }

    });

  };

})(jQuery);

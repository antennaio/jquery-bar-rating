/**
 * jQuery Bar Rating Plugin
 *
 * http://github.com/netboy/jquery-bar-rating
 *
 * Copyright (c) 2012 Kazik Pietruszewski
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
    var BarRating, root, hasTouch;
    root = typeof window !== "undefined" && window !== null ? window : global;
    hasTouch = 'ontouchstart' in root;

    root.BarRating = BarRating = (function () {

        function BarRating() {
            this.show = function () {
                var $this = $(this.elem),
                    userOptions = this.options,
                    $widget,
                    $all,
                    updateRating,
                    clickEvent = hasTouch ? 'touchstart' : 'click';

                // run only once
                if (!$this.data('barrating')) {

                    $this.data('barrating', {
                        currentRatingValue:$this.val(), // initial rating based on the OPTION value
                        currentRatingText:$('option:selected', $this).text()
                    });

                    $widget = $('<div />', { 'class':'bar-rating' }).insertAfter(this.elem);

                    // create A elements that will replace OPTIONs
                    $(this.elem).find('option').each(function () {
                        var val, text, $a, $span;

                        val = $(this).val();
                        text = $(this).text();
                        $a = $('<a />', { href:'#', 'data-rating-value':val, 'data-rating-text':text });
                        $span = $('<span />', { text:(userOptions.showValues) ? text : '' });

                        $widget.append($a.append($span));

                    });

                    if (userOptions.showSelectedRating) {
                        $widget.append($('<div />', { text:'', 'class':'current-rating' }));

                        // update text on rating change
                        $widget.find('.current-rating').on('ratingchange',
                            function () {
                                $(this).text($this.data('barrating').currentRatingText);
                            }).trigger('ratingchange');

                    }

                    // will be reused later
                    updateRating = function () {
                        // some rating was already selected?
                        if ($this.data('barrating').currentRatingValue !== undefined) {
                            $widget.find('a[data-rating-value="' + $this.data('barrating').currentRatingValue + '"]')
                                .addClass('selected current')
                                .prevAll().addClass('selected');
                        }
                    };

                    updateRating();

                    $all = $widget.find('a');

                    // make sure click event doesn't cause trouble on touch devices
                    if (hasTouch) {
                        $all.on('click', function (event) {
                            event.preventDefault();
                        });
                    }

                    $all.on(clickEvent, function (event) {
                        var $a = $(this);

                        event.preventDefault();

                        $all.removeClass('active selected current');
                        $a.addClass('selected current')
                            .prevAll().addClass('selected');

                        // remember selected rating
                        $this.data('barrating').currentRatingValue = $a.attr('data-rating-value');
                        $this.data('barrating').currentRatingText = $a.attr('data-rating-text');

                        // change selected OPTION in the select box (now hidden)
                        $this.val($a.attr('data-rating-value'));

                        $widget.find('.current-rating').trigger('ratingchange');

                        // onSelect callback
                        userOptions.onSelect.call(this, $this.data('barrating').currentRatingValue,
                            $this.data('barrating').currentRatingText);

                        return false;

                    });

                    // attach mouseenter/mouseleave event handlers
                    if (!hasTouch) {

                        $all.on({
                            mouseenter:function () {
                                var $a = $(this);
                                $all.removeClass('active').removeClass('selected');
                                $a.addClass('active').prevAll().addClass('active');
                            }
                        });

                        $widget.on({
                            mouseleave:function () {
                                $all.removeClass('active');
                                updateRating();
                            }
                        });
                    }

                    // hide the select box
                    $this.hide();
                }
            }
            this.destroy = function () {
                var $this = $(this.elem);

                $this.removeData('barrating');
                $('.bar-rating, .bar-rating a').off().remove();

                // show the select box
                $this.show();
            }
        }

        BarRating.prototype.init = function (options, elem) {
            var self;
            self = this;
            self.elem = elem;

            return self.options = $.extend({}, $.fn.barrating.defaults, options);
        };

        return BarRating;

    })();

    $.fn.barrating = function (method, options) {
        return this.each(function () {
            var plugin = new BarRating();

            // method supplied
            if (plugin.hasOwnProperty(method)) {
                plugin.init(options, this);
                return plugin[method]();

                // no method supplied or only options supplied
            } else if (typeof method === 'object' || !method) {
                options = method;
                plugin.init(options, this);
                return plugin.show();

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.barrating');
            }

        });
    };
    return $.fn.barrating.defaults = {
        showValues:false, // display rating values on the bars?
        showSelectedRating:true, // append a div with a rating to the widget?
        onSelect:function (value, text) {
        } // callback fired when a rating is selected
    };
})(jQuery);

/**
 * jQuery Bar Rating Plugin v1.0.3
 *
 * http://github.com/netboy/jquery-bar-rating
 *
 * Copyright (c) 2012-2013 Kazik Pietruszewski
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
                    $widget,
                    $all,
                    userOptions = this.options,
                    clickEvent = hasTouch ? 'touchstart' : 'click';

                // run only once
                if (!$this.data('barrating')) {

                    $this.data('barrating', {

                        // initial rating based on the OPTION value
                        currentRatingValue:$this.val(),
                        currentRatingText:$('option:selected', $this).text(),

                        // rating will be restored by calling destroy method
                        originalRatingValue:$this.val(),
                        originalRatingText:$('option:selected', $this).text()

                    });

                    $widget = $('<div />', { 'class':'bar-rating' }).insertAfter($this);

                    // first OPTION empty - allow deselecting of ratings
                    $this.data('barrating').deselectable = (!$this.find('option:first').val()) ? true : false;

                    // create A elements that will replace OPTIONs
                    $this.find('option').each(function () {
                        var val, text, $a, $span;

                        val = $(this).val();

                        // create ratings - but only if val is defined
                        if (val) {
                            text = $(this).text();
                            $a = $('<a />', { href:'#', 'data-rating-value':val, 'data-rating-text':text });
                            $span = $('<span />', { text:(userOptions.showValues) ? text : '' });

                            $widget.append($a.append($span));
                        }

                    });

                    // append .current-rating div to the widget
                    if (userOptions.showSelectedRating) {
                        $widget.append($('<div />', { text:'', 'class':'current-rating' }));
                    }

                    $all = $widget.find('a');

                    // rating change event
                    $widget.on('ratingchange',
                        function (event, value, text) {

                            // value or text undefined?
                            value = value ? value : $this.data('barrating').currentRatingValue;
                            text = text ? text : $this.data('barrating').currentRatingText;

                            // change selected OPTION in the select box (now hidden)
                            $this.find('option').attr('selected', false);
                            $this.find('option[value="' + value + '"]').attr('selected', true);

                            // update .current-rating div
                            if (userOptions.showSelectedRating) { 
                                $(this).find('.current-rating').text(text);
                            }

                        }).trigger('ratingchange');

                    // update rating event
                    $widget.on('updaterating',
                        function (event) {

                            // add .selected class
                            $(this).find('a[data-rating-value="' + $this.data('barrating').currentRatingValue + '"]')
                                .addClass('selected current')
                                .prevAll().addClass('selected');

                        }).trigger('updaterating');

                    // make sure click event doesn't cause trouble on touch devices
                    if (hasTouch) {
                        $all.on('click', function (event) {
                            event.preventDefault();
                        });
                    }

                    $all.on(clickEvent, function (event) {
                        var $a = $(this),
                            value,
                            text;

                        event.preventDefault();

                        $all.removeClass('active selected');
                        $a.addClass('selected')
                            .prevAll().addClass('selected');

                        value = $a.attr('data-rating-value');
                        text = $a.attr('data-rating-text');

                        // is current and deselectable?
                        if ($a.hasClass('current') && $this.data('barrating').deselectable) { 
                            $a.removeClass('selected current').prevAll().removeClass('selected current');
                            value = '', text = '';
                        } else {
                            $all.removeClass('current');
                            $a.addClass('current')
                        }

                        // remember selected rating
                        $this.data('barrating').currentRatingValue = value;
                        $this.data('barrating').currentRatingText = text;

                        $widget.trigger('ratingchange');

                        // onSelect callback
                        userOptions.onSelect.call(
                            this,
                            $this.data('barrating').currentRatingValue,
                            $this.data('barrating').currentRatingText
                        );

                        return false;

                    });

                    // attach mouseenter/mouseleave event handlers
                    if (!hasTouch) {

                        $all.on({
                            mouseenter:function () {
                                var $a = $(this);

                                $all.removeClass('active selected');
                                $a.addClass('active')
                                    .prevAll().addClass('active');

                                $widget.trigger('ratingchange',
                                    [$a.attr('data-rating-value'), $a.attr('data-rating-text')]
                                );
                            }
                        });

                        $widget.on({
                            mouseleave:function () {
                                $all.removeClass('active');
                                $widget
                                    .trigger('ratingchange')
                                    .trigger('updaterating');
                            }
                        });
                    }

                    // hide the select box
                    $this.hide();
                }
            }
            this.clear = function () {
                var $this = $(this.elem);
                var $widget = $this.next('.bar-rating');

                // attempt to clear the rating
                if ($widget && $this.data('barrating')) {

                    $widget.find('a').removeClass('selected current');

                    // restore original data
                    $this.data('barrating').currentRatingValue = $this.data('barrating').originalRatingValue;
                    $this.data('barrating').currentRatingText = $this.data('barrating').originalRatingText;

                    $widget
                        .trigger('ratingchange')
                        .trigger('updaterating');

                    // onClear callback
                    this.options.onClear.call(
                        this,
                        $this.data('barrating').currentRatingValue,
                        $this.data('barrating').currentRatingText
                    );
                }
            }            
            this.destroy = function () {
                var $this = $(this.elem);
                var $widget = $this.next('.bar-rating');

                // attempt to destroy the widget
                if ($widget && $this.data('barrating')) {
                    var value = $this.data('barrating').currentRatingValue;
                    var text = $this.data('barrating').currentRatingText;

                    $this.removeData('barrating');

                    $widget.off().remove();

                    // show the select box
                    $this.show();

                    // onDestroy callback
                    this.options.onDestroy.call(
                        this,
                        value,
                        text
                    );
                }
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

            // plugin works with select fields
            if (!$(this).is('select')) {
                $.error('Sorry, this plugin only works with select fields.');
            }

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
        }, // callback fired when a rating is selected
        onClear:function (value, text) {
        }, // callback fired when a rating is cleared      
        onDestroy:function (value, text) {
        } // callback fired when a widget is destroyed
    };
})(jQuery);

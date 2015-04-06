/**
 * jQuery Bar Rating Plugin v1.0.5
 *
 * http://github.com/antennaio/jquery-bar-rating
 *
 * Copyright (c) 2012-2014 Kazik Pietruszewski
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
    var BarRating, root;

    root = typeof window !== "undefined" && window !== null ? window : global;

    root.BarRating = BarRating = (function () {

        function BarRating() {
            this.show = function () {
                var $elem = this.$elem,
                    $widget,
                    $all,
                    userOptions = this.options,
                    nextAllorPreviousAll,
                    initialOption;

                // run only once
                if (!$elem.data('barrating')) {

                    if (userOptions.initialRating) {
                        initialOption = $('option[value="' + userOptions.initialRating  + '"]', $elem);
                    } else {
                        initialOption = $('option:selected', $elem);
                    }

                    $elem.data('barrating', {

                        // initial rating based on the OPTION value
                        currentRatingValue:initialOption.val(),
                        currentRatingText:initialOption.text(),

                        // rating will be restored by calling destroy method
                        originalRatingValue:initialOption.val(),
                        originalRatingText:initialOption.text()

                    });

                    $widget = $('<div />', { 'class':'br-widget' }).insertAfter($elem);

                    // create A elements that will replace OPTIONs
                    $elem.find('option').each(function () {
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

                    // append .br-current-rating div to the widget
                    if (userOptions.showSelectedRating) {
                        $widget.append($('<div />', { text:'', 'class':'br-current-rating' }));
                    }

                    // first OPTION empty - allow deselecting of ratings
                    $elem.data('barrating').deselectable = (!$elem.find('option:first').val()) ? true : false;

                    // use different jQuery function depending on the 'reverse' setting
                    if (userOptions.reverse) {
                        nextAllorPreviousAll = 'nextAll';
                    } else {
                        nextAllorPreviousAll = 'prevAll';
                    }

                    // additional classes for the widget
                    if (userOptions.reverse) {
                        $widget.addClass('br-reverse');
                    }

                    if (userOptions.readonly) {
                        $widget.addClass('br-readonly');
                    }

                    // rating change event
                    $widget.on('ratingchange',
                        function (event, value, text) {

                            // value or text undefined?
                            value = value ? value : $elem.data('barrating').currentRatingValue;
                            text = text ? text : $elem.data('barrating').currentRatingText;

                            // change selected OPTION in the select box (now hidden)
                            $elem.find('option[value="' + value + '"]').prop('selected', true);

                            $elem.change();

                            // update .br-current-rating div
                            if (userOptions.showSelectedRating) {
                                $(this).find('.br-current-rating').text(text);
                            }

                        }).trigger('ratingchange');

                    // update rating event
                    $widget.on('updaterating',
                        function (event) {
                            $widget.find('a').removeClass('br-selected br-current');

                            // add classes
                            $(this).find('a[data-rating-value="' + $elem.data('barrating').currentRatingValue + '"]')
                                .addClass('br-selected br-current')[nextAllorPreviousAll]()
                                .addClass('br-selected');

                        }).trigger('updaterating');

                    $all = $widget.find('a');

                    // fast clicks
                    $all.on('touchstart', function (event) {
                        event.preventDefault();
                        event.stopPropagation();

                        $(this).click();
                    });

                    // do not react to click events if rating is read-only
                    if (userOptions.readonly) {
                        $all.on('click', function (event) {
                            event.preventDefault();
                        });
                    }

                    // add interactions
                    if (!userOptions.readonly) {

                        $all.on('click', function (event) {
                            var $a = $(this),
                                value,
                                text;

                            event.preventDefault();

                            $all.removeClass('br-active br-selected');
                            $a.addClass('br-selected')[nextAllorPreviousAll]()
                                .addClass('br-selected');

                            value = $a.attr('data-rating-value');
                            text = $a.attr('data-rating-text');

                            // is current and deselectable?
                            if ($a.hasClass('br-current') && $elem.data('barrating').deselectable) {
                                $a.removeClass('br-selected br-current')[nextAllorPreviousAll]()
                                    .removeClass('br-selected br-current');
                                value = '', text = '';
                            } else {
                                $all.removeClass('br-current');
                                $a.addClass('br-current')
                            }

                            // remember selected rating
                            $elem.data('barrating').currentRatingValue = value;
                            $elem.data('barrating').currentRatingText = text;

                            $widget.trigger('ratingchange');

                            // onSelect callback
                            userOptions.onSelect.call(
                                this,
                                $elem.data('barrating').currentRatingValue,
                                $elem.data('barrating').currentRatingText
                            );

                            return false;

                        });

                        // attach mouseenter/mouseleave event handlers
                        $all.on({
                            mouseenter:function () {
                                var $a = $(this);

                                $all.removeClass('br-active').removeClass('br-selected');
                                $a.addClass('br-active')[nextAllorPreviousAll]()
                                    .addClass('br-active');

                                $widget.trigger('ratingchange',
                                    [$a.attr('data-rating-value'), $a.attr('data-rating-text')]
                                );
                            }
                        });

                        $widget.on({
                            mouseleave:function () {
                                $all.removeClass('br-active');
                                $widget
                                    .trigger('ratingchange')
                                    .trigger('updaterating');
                            }
                        });

                    }

                    // hide the select box
                    $elem.hide();
                }
            }
            this.clear = function () {

                // restore original data
                this.$elem.data('barrating').currentRatingValue = this.$elem.data('barrating').originalRatingValue;
                this.$elem.data('barrating').currentRatingText = this.$elem.data('barrating').originalRatingText;

                this.$widget
                    .trigger('ratingchange')
                    .trigger('updaterating');

                // onClear callback
                this.options.onClear.call(
                    this,
                    this.$elem.data('barrating').currentRatingValue,
                    this.$elem.data('barrating').currentRatingText
                );

            }
            this.destroy = function () {

                var value = this.$elem.data('barrating').currentRatingValue;
                var text = this.$elem.data('barrating').currentRatingText;

                this.$elem.removeData('barrating');

                this.$widget.off().remove();

                // show the select box
                this.$elem.show();

                // onDestroy callback
                this.options.onDestroy.call(
                    this,
                    value,
                    text
                );

            }
            this.set = function (value) {

                // set data
                this.$elem.data('barrating').currentRatingValue = value;
                this.$elem.data('barrating').currentRatingText = this.$elem.find('option[value="' + value + '"]').text();

                this.$widget
                    .trigger('ratingchange')
                    .trigger('updaterating');

            }
        }

        BarRating.prototype.init = function (options, elem) {
            var self;
            self = this;
            self.elem = elem;
            self.$elem = $(this.elem);

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
                if (method == 'show') {
                    return plugin.show(options);
                } else {
                    plugin.$widget = $(this).next('.br-widget');

                    // widget exists?
                    if (plugin.$widget && plugin.$elem.data('barrating')) {
                        return plugin[method](options);
                    }
                }

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
        initialRating:null, // initial rating
        showValues:false, // display rating values on the bars?
        showSelectedRating:true, // append a div with a rating to the widget?
        reverse:false, // reverse the rating?
        readonly:false, // make the rating ready-only?
        onSelect:function (value, text) {
        }, // callback fired when a rating is selected
        onClear:function (value, text) {
        }, // callback fired when a rating is cleared
        onDestroy:function (value, text) {
        } // callback fired when a widget is destroyed
    };
})(jQuery);

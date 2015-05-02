$(function() {
    function ratingEnable() {
        $('#example-a').barrating();

        $('#example-b').barrating('show', {
            wrapperClass: 'br-wrapper-b',
            //readonly: true
        });

        $('#example-b').barrating('set', 'Mediocre');

        $('#example-c').barrating('show', {
            wrapperClass: 'br-wrapper-c',
            showValues: true,
            showSelectedRating: false
        });

        $('#example-d').barrating('show', {
            wrapperClass: 'br-wrapper-d',
            showValues: true,
            showSelectedRating: false
        });

        $('#example-e').barrating('show', {
            wrapperClass: 'br-wrapper-e',
            initialRating: 'A',
            showValues: true,
            showSelectedRating: false,
            onSelect:function(value, text) {
                alert('Selected rating: ' + value);
            }
        });

        $('#example-f').barrating({
            wrapperClass: 'br-wrapper-f',
            showSelectedRating: false
        });

        $('#example-g').barrating('show', {
            wrapperClass: 'br-wrapper-g',
            showSelectedRating: true,
            reverse: true
        });

        $('#example-h').barrating('show', {
            wrapperClass: 'br-wrapper-h',
            reverse: true
        });
    }

    function ratingDisable() {
        $('select').barrating('destroy');
    }

    $('.rating-enable').click(function(event) {
        event.preventDefault();

        ratingEnable();

        $(this).addClass('deactivated');
        $('.rating-disable').removeClass('deactivated');
    });

    $('.rating-disable').click(function(event) {
        event.preventDefault();

        ratingDisable();

        $(this).addClass('deactivated');
        $('.rating-enable').removeClass('deactivated');
    });

    ratingEnable();
});

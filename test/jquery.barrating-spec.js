var chai = require("chai"),
    jQuery = require("jQuery");

var expect = chai.expect;

var $ = global.jQuery = jQuery;


function createSelect() {
    $('<select />', { 'id':'rating', 'name':'rating' }).appendTo('body');

    for (var i = 1; i <= 10; i++) {
        var attributes = (i == 5) ?
            attributes = { 'value':i, 'selected':'selected' } :
            attributes = { 'value':i };

        $('<option />', attributes).appendTo('#rating').html('rating-text-'+i);
    }
}

function destroySelect() {
    $('#rating').remove();
}


require("../jquery.barrating");


describe('bar rating plugin on init with custom options', function () {

    it('should update defaults', function () {
        var BarRating;
        BarRating = new global.BarRating();
        BarRating.init({
            showValues: false
        });
        expect(BarRating.options).to.be.a('object');
        expect(BarRating.options.initialRating).to.equal(null);
        expect(BarRating.options.showValues).to.equal(false);
        expect(BarRating.options.showSelectedRating).to.equal(true);
        expect(BarRating.options.reverse).to.equal(false);
        expect(BarRating.options.readonly).to.equal(false);
    });

});


describe('bar rating plugin on show', function () {

    before(function () {
        createSelect();
        $('#rating').barrating('show');
    });

    after(function () {
        $('#rating').barrating('destroy');
        destroySelect();
    });

    it('should have data', function () {
        expect($('#rating').data('barrating')).to.be.a('object');
    });

    it('should transform the select field into a rating widget', function () {
        expect($('.br-widget a')).to.have.length(10);
    });

    it('should store rating values in data attributes', function () {
        expect($('.br-widget a:first').attr('data-rating-value')).to.equal('1');
        expect($('.br-widget a:nth-child(8)').attr('data-rating-value')).to.equal('8');
        expect($('.br-widget a:first').attr('data-rating-text')).to.equal('rating-text-1');
        expect($('.br-widget a:nth-child(8)').attr('data-rating-text')).to.equal('rating-text-8');
    });

    it('should read the selected rating from the select field', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('5');
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-5');
    });

    it('should set correct class', function () {
        expect($('.br-widget a:nth-child(4)').hasClass('br-selected')).to.equal(true);
        expect($('.br-widget a:nth-child(5)').hasClass('br-selected br-current')).to.equal(true);
        expect($('.br-widget a:nth-child(6)').hasClass('br-selected')).to.equal(false);
    });

    it('should append a rating div', function () {
        expect($('div.br-current-rating')).to.have.length(1);
    });

    it('should display a correct rating', function () {
        expect($('div.br-current-rating').html()).to.equal(
            $('#rating').data('barrating').currentRatingText
        );
    });

    it('should hide the select field', function () {
        expect($('#rating').is(":visible")).to.equal(false);
    });

});


describe('bar rating plugin on show and rating selected', function () {

    var valuesFromCallback = [];

    before(function () {
        createSelect();

        $('#rating').barrating('show', {
            onSelect:function (value, text) {
                valuesFromCallback.push(value, text);
            }
        });

        $('.br-widget a:nth-child(2)').trigger('click');
    });

    after(function () {
        $('#rating').barrating('destroy');
        destroySelect();
    });

    it('should update data', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('2');
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-2');
    });

    it('should set correct class', function () {
        expect($('.br-widget a:nth-child(1)').hasClass('br-selected')).to.equal(true);
        expect($('.br-widget a:nth-child(2)').hasClass('br-selected br-current')).to.equal(true);
        expect($('.br-widget a:nth-child(3)').hasClass('br-selected')).to.equal(false);
    });

    it('should display a correct rating', function () {
        expect($('div.br-current-rating').html()).to.equal(
            $('#rating').data('barrating').currentRatingText
        );
    });

    it('should pass correct values to a callback', function () {
        expect(valuesFromCallback[0]).to.equal('2');
        expect(valuesFromCallback[1]).to.equal('rating-text-2');
    });

});


describe('bar rating plugin reversed', function () {

    before(function () {
        createSelect();

        $('#rating').barrating('show', {
            reverse:true
        });
    });

    after(function () {
        $('#rating').barrating('destroy');
        destroySelect();
    });

    it('should set correct class', function () {
        expect($('.br-widget a:nth-child(4)').hasClass('br-selected')).to.equal(false);
        expect($('.br-widget a:nth-child(5)').hasClass('br-selected br-current')).to.equal(true);
        expect($('.br-widget a:nth-child(6)').hasClass('br-selected')).to.equal(true);
    });

});


describe('bar rating plugin read-only', function () {

    before(function () {
        createSelect();

        $('#rating').barrating('show', {
            readonly:true
        });

        $('.br-widget a:nth-child(6)').trigger('click');
    });

    after(function () {
        $('#rating').barrating('destroy');
        destroySelect();
    });

    it('should set correct class', function () {
        expect($('.br-widget a:nth-child(4)').hasClass('br-selected')).to.equal(true);
        expect($('.br-widget a:nth-child(5)').hasClass('br-selected br-current')).to.equal(true);
        expect($('.br-widget a:nth-child(6)').hasClass('br-selected')).to.equal(false);
    });

    it('should ignore user input', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('5');
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-5');
    });

});


describe('bar rating plugin on deselect', function () {

    before(function () {
        createSelect();

        // prepend empty OPTION to test deselectable ratings
        $('#rating').prepend($('<option />', { 'value':'' }));
        $('#rating').barrating('show');

        // deselect rating
        $('.br-widget a:nth-child(5)').trigger('click');
    });

    after(function () {
        $('#rating').barrating('destroy');
        destroySelect();
    });

    it('should update data', function () {
        expect($('#rating').data('barrating').deselectable).to.equal(true);
    });

    it('should successfully deselect rating', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('');
        expect($('#rating').data('barrating').currentRatingText).to.equal('');
    });

});


describe('bar rating plugin on clear', function () {

    var valuesFromCallback = [];

    before(function () {
        createSelect();

        $('#rating').barrating('show', {
            onClear:function (value, text) {
                valuesFromCallback.push(value, text);
            }
        });
        $('.br-widget a:nth-child(6)').trigger('click');
        $('#rating').barrating('clear');
    });

    after(function () {
        $('#rating').barrating('destroy');
        destroySelect();
    });

    it('should restore original rating', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('5');
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-5');
    });

    it('should set correct class', function () {
        expect($('.br-widget a:nth-child(4)').hasClass('br-selected')).to.equal(true);
        expect($('.br-widget a:nth-child(5)').hasClass('br-selected br-current')).to.equal(true);
        expect($('.br-widget a:nth-child(6)').hasClass('br-selected')).to.equal(false);
    });

    it('should pass correct values to a callback', function () {
        expect(valuesFromCallback[0]).to.equal('5');
        expect(valuesFromCallback[1]).to.equal('rating-text-5');
    });

});


describe('bar rating plugin on destroy', function () {

    var valuesFromCallback = [];

    before(function () {
        createSelect();

        $('#rating').barrating('show', {
            onDestroy:function (value, text) {
                valuesFromCallback.push(value, text);
            }
        });

        $('#rating').barrating('destroy');

    });

    after(function () {
        destroySelect();
    });

    it('should remove data', function () {
        expect($('#rating').data('barrating')).to.equal('');
    });

    it('should show the select field back again', function () {
        expect($('#rating').is(":visible")).to.equal(true);
    });

    it('should pass correct values to a callback', function () {
        expect(valuesFromCallback[0]).to.equal('5');
        expect(valuesFromCallback[1]).to.equal('rating-text-5');
    });

});


describe('bar rating plugin on set value', function () {

    before(function () {
        createSelect();
        $('#rating')
            .barrating()
            .barrating('set', 3);
    });

    after(function () {
        destroySelect();
    });

    it('should set correct value', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal(3);
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-3');
    });

    it('should set correct class', function () {
        expect($('.br-widget a:nth-child(3)').hasClass('br-selected')).to.equal(true);
        expect($('.br-widget a:nth-child(3)').hasClass('br-current')).to.equal(true);
    });

});


describe('bar rating plugin on set non-existing value', function () {

    before(function () {
        createSelect();
        $('#rating')
            .barrating('show', { initialRating: 5 })
            .barrating('set', 9999);
    });

    after(function () {
        destroySelect();
    });

    it('should do nothing', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('5');
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-5');
    });

});

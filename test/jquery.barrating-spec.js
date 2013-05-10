var chai = require("chai"),
    jsdom = require("jsdom"),
    jQuery = require("jQuery");

var expect = chai.expect;

var window = jsdom.jsdom("<html><body></body></html>").createWindow(),
    document = window.document;

var $ = global.jQuery = jQuery.create(window);


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
        BarRating = new root.BarRating();
        BarRating.init({
            showValues: false
        });
        expect(BarRating.options).to.be.a('object');
        expect(BarRating.options.showValues).to.equal(false);
        expect(BarRating.options.showSelectedRating).to.equal(true);
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
        expect($('.bar-rating a')).to.have.length(10);
    });

    it('should store rating values in data attributes', function () {
        expect($('.bar-rating a:first').attr('data-rating-value')).to.equal('1');
        expect($('.bar-rating a:nth-child(8)').attr('data-rating-value')).to.equal('8');
        expect($('.bar-rating a:first').attr('data-rating-text')).to.equal('rating-text-1');
        expect($('.bar-rating a:nth-child(8)').attr('data-rating-text')).to.equal('rating-text-8');
    });

    it('should read the selected rating from the select field', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('5');
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-5');
    });

    it('should set a correct class', function () {
        expect($('.bar-rating a:nth-child(5)').attr('class')).to.equal('selected current');
    });

    it('should append a rating div', function () {
        expect($('div.current-rating')).to.have.length(1);
    });

    it('should display a correct rating', function () {
        expect($('div.current-rating').html()).to.equal(
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

        $('.bar-rating a:nth-child(2)').trigger('click');
    });

    after(function () {
        $('#rating').barrating('destroy');
        destroySelect();
    });

    it('should update data', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('2');
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-2');
    });

    it('should set a correct class', function () {
        expect($('.bar-rating a:nth-child(2)').attr('class')).to.equal('selected current');
    });

    it('should display a correct rating', function () {
        expect($('div.current-rating').html()).to.equal(
            $('#rating').data('barrating').currentRatingText
        );
    });

    it('should pass correct values to a callback', function () {
        expect(valuesFromCallback[0]).to.equal('2');
        expect(valuesFromCallback[1]).to.equal('rating-text-2');
    });

});


describe('bar rating plugin on deselect', function () {

    before(function () {
        createSelect();

        // prepend empty OPTION to test deselectable ratings
        $('#rating').prepend($('<option />', { 'value':'' }));
        $('#rating').barrating('show');

        // deselect rating
        $('.bar-rating a:nth-child(5)').trigger('click');
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


describe('bar rating plugin on destroy', function () {

    before(function () {
        createSelect();
    });

    after(function () {
        destroySelect();
    });

    it('should show the select field back again', function () {
        $('#rating').barrating().barrating('destroy');
        expect($('#rating').is(":visible")).to.equal(true);
    });

});

jQuery Bar Rating Plugin
========================

Minimal, light-weight jQuery ratings.

How to use
----------

Examples of use are here:

[http://netboy.pl/demo/jquery-bar-rating/examples/](http://netboy.pl/demo/jquery-bar-rating/examples/)

How to run tests
----------------

```
git clone https://github.com/netboy/jquery-bar-rating
cd jquery-bar-rating
npm install
./node_modules/mocha/bin/mocha -R spec

  bar rating plugin on init with custom options
    ✓ should update defaults

  bar rating plugin on show
    ✓ should have data
    ✓ should transform the select field into a rating widget
    ✓ should store rating values in data attributes
    ✓ should read the selected rating from the select field
    ✓ should set a correct class
    ✓ should append a rating div
    ✓ should display a correct rating
    ✓ should hide the select field

  bar rating plugin on show and rating selected
    ✓ should update data
    ✓ should set a correct class
    ✓ should display a correct rating
    ✓ should pass correct values to a callback

  bar rating plugin on destroy
    ✓ should show the select field back again


  ✔ 14 tests complete (235 ms)

```

License
-------

Dual licensed under the MIT and GPL licenses:<br />
[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)<br />
[http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)
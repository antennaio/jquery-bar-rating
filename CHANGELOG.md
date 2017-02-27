HEAD
----

- bugfix: `fastClicks` option check fixed

- new option added: `triggerChange`

1.2.2
-----

- new option added: `allowEmpty`

- new option added: `emptyValue`

- bugfix: accept empty string in set method (@kzmi, [#85](https://github.com/antennaio/jquery-bar-rating/pull/85))

- bugfix: little CSS fix (@bygiro, [#74](https://github.com/antennaio/jquery-bar-rating/pull/74))

- bugfix: syntax error within example in documentation (@sorter, [#72](https://github.com/antennaio/jquery-bar-rating/pull/72))

- added optimal travis config (@amilajack, [#71](https://github.com/antennaio/jquery-bar-rating/pull/71))

1.2.1
-----

- fixed variable declaration (@schurig, [#68](https://github.com/antennaio/jquery-bar-rating/pull/68))

- added a note about [R language integration](https://github.com/harveyl888/barRating) to the FAQ (@harveyl888, [#67](https://github.com/antennaio/jquery-bar-rating/issues/67))

1.2.0
-----

- deprecated `wrapperClass` option removed

- readonly ratings - `cursor: default` rule added to all themes

- support for displaying of fractional star ratings (2.5, 3.7, 4.9) - fractional ratings will be marked with `br-fractional` and `br-fractional-*` classes (where * is 10, 20, 30...)

- reset select field when ratings are cleared

- `deselectable` option added

1.1.4
-----

- license file added

- bugfix: when using "set" method the colors are reversed (@hrishiballal, [#59](https://github.com/antennaio/jquery-bar-rating/issues/59))

- update selected rating value when tabbing (fixes issue [#51](https://github.com/antennaio/jquery-bar-rating/issues/51))

- bugfix: click doesn't fire onSelect after changing readonly to true and then to false (@zimarai, [#54](https://github.com/antennaio/jquery-bar-rating/pull/54))

1.1.3
-----

- new option added: `silent`

- `readonly` method added

- namespaced events

- rating widget - redundant span elements dropped

- `wrapperClass` option deprecated

- pass event object to onSelect callback

- print styles added

- new option added: `hoverState`

1.1.2
-----

- AMD and CommonJS compatibility

- FAQ section added to the docs

- triggering onSelect callback when using `set` method

1.1.1
-----

- themes for basic stars in flavors for css, fontawesome and bootstrap (@garygreen, [#35](https://github.com/antennaio/jquery-bar-rating/pull/35))

- switch to using karma and phantomjs for testing (@garygreen, [#37](https://github.com/antennaio/jquery-bar-rating/pull/37))

- gulp tasks added

- minified version with source map file stored in `dist` directory

1.1.0
-----

- new & improved demo page

- plugin will create a wrapper div by itself

- new option added: `wrapperClass`

- new option added: `fastClicks`

1.0.6
-----

- vertical rating example

- bugfix: Knockout doesn't recognize values set by the widget unless we call change() on the select tag. (@akshaykarle, [#25](https://github.com/antennaio/jquery-bar-rating/pull/25))

- documentation updated with detailed installation instructions

- `set` method added

- bugfix: onClear and onDestroy callbacks fixed

- allow html in ratings (fixes issue [#30](https://github.com/antennaio/jquery-bar-rating/issues/30)), thanks @techmantoolz

1.0.5
-----

- bugfix: selected option changed by propterties, not attributes (fixes issue [#7](https://github.com/antennaio/jquery-bar-rating/issues/7))

- `initialRating` setting added

- prefixed class names:

  `.bar-rating` changed to `.br-widget`

  `.current-rating` changed to `.br-current-rating`

  `.active` changed to `.br-active`

  `.selected` changed to `.br-selected`

  `.current` changed to `.br-current`

- read-only and reversed rating marked with `.br-readonly` and `.br-reverse` classes respectively

- bugfix: removed touch detection - improved cross-browser compatibility (fixes issue [#11](https://github.com/antennaio/jquery-bar-rating/issues/11))

- bower.json added

1.0.4
-----

- `readonly` setting added
- `reverse` setting added

1.0.3
-----
- `destroy` method will destroy a single instance of the plugin
- `clear` method added
- `onClear` and `onDestroy` callbacks added

1.0.2
-----
- `.current-rating` div gets updated on mouseenter

1.0.1
-----
- new scenario: empty ratings are allowed, user can deselect a previously selected rating (@linko, @antennaio, [#2](https://github.com/antennaio/jquery-bar-rating/pull/2))

- the plugin will throw an error if called on anything other than `select` field

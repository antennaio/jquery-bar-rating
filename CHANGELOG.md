HEAD
----

- vertical rating example

- bugfix: Knockout doesn't recognize values set by the widget unless we call change() on the select tag. (@akshaykarle, [#25](https://github.com/antennaio/jquery-bar-rating/pull/25))

- documentation updated with detailed installation instructions

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

HEAD
----

- `initialRating` setting added

- prefixed class names:

  `.bar-rating` changed to `.br-widget`

  `.current-rating` changed to `.br-current-rating`

  `.active` changed to `.br-active`

  `.selected` changed to `.br-selected`

  `.current` changed to `.br-current`

- read-only and reversed rating marked with `.br-readonly` and `.br-reverse` classes respectively

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
- new scenario: empty ratings are allowed, user can deselect a previously selected rating

- the plugin will throw an error if called on anything other than `select` field
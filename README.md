# Drupal.behave

Super sexy Drupal JS behaviors.

## Conventional Way

```js
(function ($) {
  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      $('.myDOM', context).text('Who throws a shoe?!?');
    }
  };
})(jQuery);
```

## Yeah, Baby, Way

`jQuery` is also passed in as the third argument. Yeah, baby!

```js
Drupal.behave('exampleModule').attach = function (context, settings, $) {
  $('.myDOM', context).text('Who throws a shoe?!?');
}
```

Even easier, you can use `.ready` without the context and settings arguments — the function context (`this`) will provide `context` and `settings`. Easier to read and write.

```js
Drupal.behave('exampleModule').ready = function ($) {
  $('.myDOM', this.context).text('Who throws a shoe?!?');
}
```

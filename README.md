# Drupal.behave

Drupal JS behaviors made easy. 

## Conventional Way

```js
(function ($) {
  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      $('.example', context).click(function () {
        $(this).next('ul').toggle('show');
      });
    }
  };
})(jQuery);
```

## Yeah, Baby, Way

`jQuery` is also passed in as the third argument. Yeah, baby!

```js
Drupal.behave('exampleModule').attach = function (context, settings, $) {
  $('.example', context).click(function () {
    $(this).next('ul').toggle('show');
  });
}
```

Even easier, you can use `.ready` without the context and settings arguments — the function context (`this`) will provide `context` and `settings`. Easier to read and write.

```js
Drupal.behave('exampleModule').ready = function ($) {
  $('.example', this.context).click(function () {
    $(this).next('ul').toggle('show');
  });
}
```

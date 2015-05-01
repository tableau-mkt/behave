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
  }
};
})(jQuery);
```

## Yeah, Baby, Way

`jQuery` is passed in as `$`, and the function context (`this`) has the values for
`context` and `settings`. Easier to read and write. Yeah, baby!

```js
Drupal.behave('exampleModule').attach = function ($) {
  $('.example', this.context).click(function () {
    $(this).next('ul').toggle('show');
  });
}
```

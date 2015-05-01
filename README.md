# Drupal.behave

Super sexy Drupal JS behaviors.

## Conventional Way

```
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

```
Drupal.behave('exampleModule').attach = function (context, settings, $) {
  $('.myDOM', context).text('Who throws a shoe?!?');
}
```

Even easier, you can use `.ready` without the context and settings arguments — the function context (`this`) will provide `context` and `settings`. Easier to read and write.

```
Drupal.behave('exampleModule').ready = function ($) {
  $('.myDOM', this.context).text('Who throws a shoe?!?');
}
```

## Detach, too

In the not as common case of a `detach` handler, you'll need a slightly different syntax:

```
var behavior = Drupal.behave('exampleModule');

behavior.attach = function (context, settings, $) {
  $('.myDOM', context).text('Who throws a shoe?!?');
}

behavior.detach = (context, settings, trigger, $) {
  $('.myDOM', context).text('Oh, behave!'); 
}
```

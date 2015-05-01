# Drupal.behave ($b for short)

Super sexy Drupal JS behaviors.

## Conventional Way...

```
(function ($) {
  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      $('.myDOM', context).text('Who throws a shoe?!?');
    }
  };
})(jQuery);
```

## Drupal.behave Way! Yeah, Baby!

`jQuery` is also passed in as the third argument. Yeah, baby!

```
$b('exampleModule').attach(function (context, settings, $) {
  $('.myDOM', context).text('Who throws a shoe?!?');
});
```

Even easier, you can use `.ready` without the context and settings arguments — the function context (`this`) will provide `context` and `settings`. Easier to read and write.

```
$b('exampleModule').ready(function ($) {
  $('.myDOM', this.context).text('Who throws a shoe?!?');
});
```

## Detach, if you want.

```
$b('exampleModule')
  .attach(function (context, settings, $) {
    $('.myDOM', context).text('Who throws a shoe?!?');
  });
  .detach(function (context, settings, trigger, $) {
    $('.myDOM', context).text('Oh, behave!'); 
  })
```

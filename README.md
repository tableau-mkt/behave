# Drupal.behave ![build status](https://travis-ci.org/tableau-mkt/behave.svg?branch=7.x-1.x)

Super sexy Drupal JS behaviors.

## API in a nutshell

### Drupal.behave(name, [options])

It's a super simple, jQuery like, chainable API. Pass the `name` of your behavior, and an optional `options` argument.

### Before: The Conventional Drupal 7 Way

```
(function ($) {
  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      $('.myDOM', context).text('Who throws a shoe?!?');
    }
  };
})(jQuery);
```

### After: Yeah, Baby Way!

`jQuery` is also passed in as the third argument. Yeah, baby!

```
Drupal.behave('exampleModule').attach(function (context, settings, $) {
  $('.myDOM', context).text('Who throws a shoe?!?');
});
```

Even easier, you can use `.ready` without the context and settings arguments — the function context (`this`) will provide `context`, `settings`<sup>1</sup>, and `behavior`<sup>2</sup>. Easier to read and write.

```
Drupal.behave('exampleModule').ready(function ($) {
  $('.myDOM', this.context).text('Who throws a shoe?!?');
});
```
<sup>1</sup>The `settings` property on the function context refers to `Drupal.settings`.

<sup>2</sup>The `behavior` property on the function context refers to `Drupal.behaviors.exampleModule` in this case.

### Detach, if you want.

```
Drupal.behave('exampleModule')
  .attach(function (context, settings, $) {
    $('.myDOM', context).text('Who throws a shoe?!?');
  });
  .detach(function (context, settings, trigger, $) {
    $('.myDOM', context).text('Oh, behave!'); 
  })
```

### Extending the Drupal behavior

You can extend the Drupal behavior, e.g., with your own functions, like this:

```
Drupal.behave('exampleModule')
  .extend({
    myFunction: function myFunction() {

    }
  });
```

### Low-level access to the behave object

If you really want to, you can grab the behave object.

```
var behave = Drupal.behave('exampleModule').behave();
```

### Options

#### `only`: Firing context, and AJAX

An important caveat to using behave is that the majority use case is considered—your behave attach/ready won't be called for AJAX by default. If you want to attach to AJAX as well, use `{only: false}` option.

```
// By including `only: false` option, we will run in all contexts (including AJAX).
Drupal.behave('exampleModule', {only: false}).ready(function ($) {
  $('.myDOM', this.context).text('Who throws a shoe?!?');
});
```

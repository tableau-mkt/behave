# Drupal.behave

Super sexy Drupal JS behaviors.

## API in a nutshell

### Drupal.behave(...) or $b(...) shorthand

It's a super simple, jQuery like, chainable API.

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

Even easier, you can use `.ready` without the context and settings arguments — the function context (`this`) will provide `context`, `settings`, and `behave`<sup>1</sup>. Easier to read and write.

```
Drupal.behave('exampleModule').ready(function ($) {
  $('.myDOM', this.context).text('Who throws a shoe?!?');
});
```

<sup>1</sup>The `behave` property on the function context refers to a behave instance object you could use for functions, user data, etc.

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

### Low-level access to the behave object

If you really want to, you can grab the behave object.

```
var behave = Drupal.behave('exampleModule').behave();
```

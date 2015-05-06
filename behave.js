/**
 * Drupal.behave helper.
 *
 * @param {String} name
 * @param {Object} options
 *   options.only - the only context to run this behavior in (false to run in all contexts)
 */
Drupal.behave = function(name, options) {
  var defaults = {
        only: document
      },
      behavior,
      _behave;

  // Create the behavior if it doesn't exist, and save a shorter reference.
  Drupal.behaviors[name] = Drupal.behaviors[name] || {};
  behavior = Drupal.behaviors[name];

  // Add the _behave property to the Drupal behavior which will store behave
  // options, chainable api, attach, ready, and detach properties. Note: We will
  // store all behave module properties within the _behave namespace, so that
  // users can add whatever properties they want on the behave object, without
  // worrying about naming collisions.
  behavior._behave = {
    options: jQuery.extend({}, options, defaults)
  };

  // Save a reference to the behave context.
  _behave = behavior._behave;

  // Ensure name argument is provided.
  if (!name || typeof name !== 'string') {
    throw 'name required (as type String)';
  }

  // The attach wrapper function. Called by drupal.js.
  behavior.attach = function (context, settings) {
    // Here, we'll check _options.only against the behaviors context.
    if (_behave.options.only && context !== _behave.options.only) {
      return;
    }
    // Call the custom behave attach function if it exists.
    if (typeof _behave.attach === 'function') {
      _behave.attach.call(this, context, settings, jQuery, behavior);
    }
    // Call the custom behave ready function if it exists.
    if (typeof _behave.ready === 'function') {
      _behave.ready.call({context: context, settings: settings, behavior: behavior}, jQuery);
    }
  };

  // The detach wrapper function. Called by drupal.js.
  behavior.detach = function (context, settings, trigger) {
    if (typeof _behave.detach === 'function') {
      _behave.detach.call(this, context, settings, trigger, jQuery);
    }
  };

  // Define our chainable API.
  _behave.api = {
    attach: function (fn) {
      _behave.attach = fn;
      return _behave.api;
    },
    detach: function (fn) {
      _behave.detach = fn;
      return _behave.api;
    },
    ready: function (fn) {
      _behave.ready = fn;
      return _behave.api;
    },
    behave: function () {
      return _behave;
    },
    behavior: function () {
      return behavior;
    },
    extend: function (object) {
      jQuery.extend(behavior, object);
      return _behave.api;
    }
  };

  // Return our chainable API.
  return _behave.api;
};

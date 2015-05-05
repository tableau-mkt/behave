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
      behave,
      _behave;

  // Create the behavior if it doesn't exist, and save a shorter reference.
  Drupal.behaviors[name] = Drupal.behaviors[name] || {};
  behavior = Drupal.behaviors[name];

  // Add the behave property to the Drupal behavior which will store behave
  // options, chainable api, attach, ready, and detach properties. Note: We will
  // store all behave module properties within the _behave namespace, so that
  // users can add whatever properties they want on the behave object, without
  // worrying about naming collisions.
  behavior.behave = {
    _behave: {
      options: jQuery.extend({}, options, defaults)
    }
  };

  // Save a reference to the parent behave context, and the _behave module context.
  behave = behavior.behave;
  _behave = behave._behave;

  // Ensure name argument is provided.
  if (!name || typeof name !== 'string') {
    throw 'name required (as type String)';
  }

  // The attach wrapper function. Called by drupal.js.
  behavior.attach = function (context, settings) {
    var hasAttach = typeof _behave.attach === 'function',
        hasReady = typeof _behave.ready === 'function';

    // Here, we'll check _options.only against the behaviors context.
    if (_behave.options.only && context !== _behave.options.only) {
      return;
    }
    // Ensure attach or ready function exists on behave object.
    if (!hasAttach && !hasReady) {
      throw 'attach or ready property required (as type Function)';
    }
    // Call the custom behave attach function.
    if (hasAttach) {
      _behave.attach.call(this, context, settings, jQuery, behave);
    }
    // Call the custom behave ready function.
    if (hasReady) {
      _behave.ready.call({context: context, settings: settings, behave: behave}, jQuery);
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
      return behave.api;
    },
    detach: function (fn) {
      _behave.detach = fn;
      return behave.api;
    },
    ready: function (fn) {
      _behave.ready = fn;
      return behave.api;
    },
    behave: function () {
      return behave;
    }
  };

  // Return our chainable API.
  return _behave.api;
};

// Provide a shorthand, e.g. $b('example').ready(function ($) { ... });
window.$b = Drupal.behave;

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
      _this;

  // Create the behavior if it doesn't exist, and save a shorter reference.
  Drupal.behaviors[name] = Drupal.behaviors[name] || {};
  behavior = Drupal.behaviors[name];

  // Add a "private" property to the Drupal behavior which will store behave
  // options, chainable api, attach, ready, and detach properties.
  behavior._behave = {
    options: jQuery.extend({}, options, defaults)
  };

  // Save a reference to the behave context. Let's call it "_this" since it's
  // Drupal.behave's core object.
  _this = behavior._behave;

  // Ensure name argument is provided.
  if (!name || typeof name !== 'string') {
    throw 'name required (as type String)';
  }

  // The attach wrapper function. Called by drupal.js.
  behavior.attach = function (context, settings) {
    var hasAttach = typeof _this.attach === 'function',
        hasReady = typeof _this.ready === 'function';

    // Here, we'll check options.only against the behaviors context.
    if (_this.options.only && context !== _this.options.only) {
      return;
    }
    // Ensure attach or ready function exists on behave object.
    if (!hasAttach && !hasReady) {
      throw 'attach or ready property required (as type Function)';
    }
    // Call the custom behave attach function.
    if (hasAttach) {
      _this.attach.call(this, context, settings, jQuery);
    }
    // Call the custom behave ready function.
    if (hasReady) {
      _this.ready.call({context: context, settings: settings}, jQuery);
    }
  };

  // The detach wrapper function. Called by drupal.js.
  behavior.detach = function (context, settings, trigger) {
    if (typeof _this.detach === 'function') {
      _this.detach.call(this, context, settings, trigger, jQuery);
    }
  };

  // Define our chainable API.
  _this.api = {
    attach: function (fn) {
      _this.attach = fn;
      return _this.api;
    },
    detach: function (fn) {
      _this.detach = fn;
      return _this.api;
    },
    ready: function (fn) {
      _this.ready = fn;
      return _this.api;
    },
    behavior: function () {
      return _this;
    }
  };

  // Return our chainable API.
  return _this.api;
};

// Provide a shorthand, e.g. $b('example').ready(function ($) { ... });
window.$b = Drupal.behave;

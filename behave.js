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

  Drupal.behaviors[name] = Drupal.behaviors[name] || {};
  behavior = Drupal.behaviors[name];
  behavior._behave = {
    options: jQuery.extend({}, options, defaults)
  };
  _this = behavior._behave;

  if (!name || typeof name !== 'string') {
    throw 'name required (as type String)';
  }

  behavior.attach = function (context, settings) {
    var hasAttach = typeof _this.attach === 'function',
        hasReady = typeof _this.ready === 'function';

    if (_this.options.only && context !== _this.options.only) {
      return;
    }
    if (!hasAttach && !hasReady) {
      throw 'attach or ready property required (as type Function)';
    }
    if (hasAttach) {
      _this.attach.call(this, context, settings, jQuery);
    }
    if (hasReady) {
      _this.ready.call({context: context, settings: settings}, jQuery);
    }
  };

  behavior.detach = function (context, settings, trigger) {
    if (typeof _this.detach === 'function') {
      _this.detach.call(this, context, settings, trigger, jQuery);
    }
  };

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

  return _this.api;
};

// Provide a shorthand, e.g. $b('example').ready(function ($) { ... });
window.$b = Drupal.behave;

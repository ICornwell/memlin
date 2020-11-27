"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasKey = exports.hasLabel = exports.has = void 0;

var _traverser = require("../traverser");

var has = function has() {
  if (arguments.length === 1) return hasKey(arguments.length <= 0 ? undefined : arguments[0]);
  if (arguments.length === 2) return hasKeyValue(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
  if (arguments.length === 3) return hasLabelKeyValue(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
};

exports.has = has;

var hasLabel = function hasLabel() {
  for (var _len = arguments.length, labels = new Array(_len), _key = 0; _key < _len; _key++) {
    labels[_key] = arguments[_key];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = context.traversers.filter(function (t) {
        return t.current.label && labels.includes(t.current.label);
      });
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};

exports.hasLabel = hasLabel;

var hasKey = function hasKey() {
  for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    keys[_key2] = arguments[_key2];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = context.traversers.filter(function (t) {
        return t.current.props && Object.keys(t.current).filter(function (k) {
          return keys.includes(k);
        });
      });
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};

exports.hasKey = hasKey;

var hasKeyValue = function hasKeyValue(key, value) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = context.traversers.filter(function (t) {
        return t.current.props && t.current.props[key] === value;
      });
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};

var hasLabelKeyValue = function hasLabelKeyValue(label, key, value) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = context.traversers.filter(function (t) {
        return t.current.label && t.current.label === label && t.current.props && t.current.props[key] === value;
      });
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};
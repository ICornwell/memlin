"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasKey_Text = exports.hasKey = exports.hasLabel_Text = exports.hasLabel = exports.has_Text = exports.has = void 0;

var _traverser = require("../traverser");

var _sanitiseVal = _interopRequireDefault(require("../utils/sanitiseVal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: All these filters are implemented as full steps except the update the current traverers,
//  rather than extending the paths. They should be modulators (like to and from) so the preceding
//  step being filtered can use them more optimally - this will become important when 'and' and 'or'
//  steps are added
var has = function has() {
  if (arguments.length === 1) return hasKey(arguments.length <= 0 ? undefined : arguments[0]);
  if (arguments.length === 2) return hasKeyValue(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
  if (arguments.length === 3) return hasLabelKeyValue(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
};

exports.has = has;

var has_Text = function has_Text() {
  for (var _len = arguments.length, hasArgs = new Array(_len), _key = 0; _key < _len; _key++) {
    hasArgs[_key] = arguments[_key];
  }

  var inner = hasArgs ? hasArgs.map(function (a) {
    return (0, _sanitiseVal.default)(a);
  }).join(', ') : '';
  var steps = ["has(".concat(inner, ")")];
  return steps.join('.');
};

exports.has_Text = has_Text;

var hasLabel = function hasLabel() {
  for (var _len2 = arguments.length, labels = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    labels[_key2] = arguments[_key2];
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

var hasLabel_Text = function hasLabel_Text() {
  for (var _len3 = arguments.length, hasArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    hasArgs[_key3] = arguments[_key3];
  }

  var inner = hasArgs ? hasArgs.map(function (a) {
    return "'".concat(a, "'");
  }).join(', ') : '';
  var steps = ["hasLabel(".concat(inner, ")")];
  return steps.join('.');
};

exports.hasLabel_Text = hasLabel_Text;

var hasKey = function hasKey() {
  for (var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    keys[_key4] = arguments[_key4];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = context.traversers.filter(function (t) {
        return t.current.props && Object.keys(t.current.props).find(function (k) {
          return keys.includes(k);
        });
      });
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};

exports.hasKey = hasKey;

var hasKey_Text = function hasKey_Text() {
  for (var _len5 = arguments.length, hasArgs = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    hasArgs[_key5] = arguments[_key5];
  }

  var inner = hasArgs ? hasArgs.map(function (a) {
    return "'".concat(a, "'");
  }).join(', ') : '';
  var steps = ["hasKey(".concat(inner, ")")];
  return steps.join('.');
};

exports.hasKey_Text = hasKey_Text;

var hasKeyValue = function hasKeyValue(key, value) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = key === 'id' ? context.traversers.filter(function (t) {
        return t.current.id && t.current.id === value;
      }) : context.traversers.filter(function (t) {
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
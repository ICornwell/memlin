"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.by = exports.select = exports.as = void 0;

var _traverser = require("../traverser");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var as = function as() {
  for (var _len = arguments.length, labels = new Array(_len), _key = 0; _key < _len; _key++) {
    labels[_key] = arguments[_key];
  }

  return function (getCurrentContext) {
    return function (args) {
      return getCurrentContext(_objectSpread(_objectSpread({}, args), {}, {
        labels: labels
      }));
    };
  };
};

exports.as = as;

var select = function select() {
  for (var _len2 = arguments.length, labels = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    labels[_key2] = arguments[_key2];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(_objectSpread({}, args));
      var ts = context.traversers.map(function (t) {
        var sels = labels.map(function (l, i) {
          var idx = t.labels.findIndex(function (tl) {
            return tl.includes(l);
          });
          var sel = t.objects[idx];
          var selBy = args.by && i < args.by.length && sel.props[args.by[i]];
          return idx >= 0 ? _defineProperty({}, l, selBy !== null && selBy !== void 0 ? selBy : sel) : undefined;
        }).filter(function (obj) {
          return obj;
        });
        var obj = sels.length == 1 ? Object.values(sels[0])[0] : sels;
        return (0, _traverser.updateTraverser)(t, obj, args);
      });
      return (0, _traverser.updateContext)(context, ts);
    };
  };
};

exports.select = select;

var by = function by(_by) {
  return function (getCurrentContext) {
    return function (args) {
      _by = (0, _traverser.ensureIsArray)(_by);
      var bys = args.by ? [].concat(_toConsumableArray(_by), _toConsumableArray(args.by)) : _by;
      return getCurrentContext(_objectSpread(_objectSpread({}, args), {}, {
        by: bys
      }));
    };
  };
};

exports.by = by;
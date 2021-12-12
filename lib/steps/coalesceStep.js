"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coalesce_Text = exports.coalesce = void 0;

var _traverser = require("../traverser");

require("regenerator-runtime/runtime");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(map);

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var coalesce = function coalesce() {
  for (var _len = arguments.length, stepsSet = new Array(_len), _key = 0; _key < _len; _key++) {
    stepsSet[_key] = arguments[_key];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var results = context.traversers.flatMap(function (t) {
        // create a local context for each traverser to run the union subqueries
        // so we can keep the result traverser paths together
        var localContext = {
          graph: context.graph,
          traversers: [t]
        };
        var ts = find(map(stepsSet, function (steps) {
          return (0, _traverser.resolveTraverserArg)(steps, localContext, true).map(function (o) {
            return o ? (0, _traverser.updateTraverser)(t, o, args) : null;
          });
        }), function (t) {
          return t.length > 0;
        });
        return ts;
      });
      return (0, _traverser.updateContext)(context, results);
    };
  };
}; // we need a findMap function that finds the first item who's map meets a criteria
//lazy mapper yields as it enumerates, rather than processing whole array


exports.coalesce = coalesce;

function map(a, fn) {
  var _iterator, _step, x;

  return regeneratorRuntime.wrap(function map$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator = _createForOfIteratorHelper(a);
          _context.prev = 1;

          _iterator.s();

        case 3:
          if ((_step = _iterator.n()).done) {
            _context.next = 9;
            break;
          }

          x = _step.value;
          _context.next = 7;
          return fn(x);

        case 7:
          _context.next = 3;
          break;

        case 9:
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);

          _iterator.e(_context.t0);

        case 14:
          _context.prev = 14;

          _iterator.f();

          return _context.finish(14);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 11, 14, 17]]);
}

function find(a, fn) {
  var _iterator2 = _createForOfIteratorHelper(a),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var x = _step2.value;
      if (fn(x)) return x;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

var coalesce_Text = function coalesce_Text() {
  for (var _len2 = arguments.length, uSteps = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    uSteps[_key2] = arguments[_key2];
  }

  var inner = uSteps ? uSteps.map(function (s) {
    return s.getText();
  }).join(', ') : '';
  var steps = ["coalesce(".concat(inner, ")")];
  return steps.join('.');
};

exports.coalesce_Text = coalesce_Text;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.from = exports.to = exports.addE = exports.addV = void 0;

var _uuid = require("uuid");

var _traverser = require("../traverser");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addV = function addV(label, props) {
  return function (getCurrentContext) {
    return function (args) {
      // map/side-effect step
      var context = getCurrentContext(args);
      var ts = context.traversers.map(function (t) {
        var id = (0, _uuid.v4)();
        var v = {
          label: label,
          id: id,
          props: props
        };
        context.graph.vertices.push(v);
        return (0, _traverser.updateTraverser)(t, v, args);
      });
      return (0, _traverser.updateContext)(context, ts);
    };
  };
};

exports.addV = addV;

var addE = function addE(label, props) {
  return function (getCurrentContext) {
    return function (args) {
      // map/side-effect step
      var myArgs = _objectSpread({}, args); // this step consumes 'to' and 'from args from upstream modulators


      delete args.out;
      delete args.in;
      var context = getCurrentContext(args);
      var vs = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      });
      var travIsIn = !myArgs.in;
      var travIsOut = !myArgs.out;
      if (myArgs.in) myArgs.in = (0, _traverser.resolveTraverserArg)(myArgs.in, context, false);
      if (myArgs.out) myArgs.out = (0, _traverser.resolveTraverserArg)(myArgs.out, context, false);

      var ft = _objectSpread({
        out: [undefined],
        in: [undefined]
      }, myArgs);

      var idOrVal = function idOrVal(x) {
        return x.id ? x.id : x;
      }; // support multiple 'to's and 'froms' to create multiple edges
      // and map from the original traverser


      var ts = vs.flatMap(function (t) {
        return ft.out.flatMap(function (out) {
          return ft.in.flatMap(function (in_) {
            var e = {
              label: label,
              id: (0, _uuid.v4)(),
              in: travIsIn ? t.current.id : idOrVal(in_),
              out: travIsOut ? t.current.id : idOrVal(out),
              props: props
            };
            context.graph.edges.push(e);
            return (0, _traverser.updateTraverser)(t, e, args);
          });
        });
      });
      return (0, _traverser.updateContext)(context, ts);
    };
  };
}; // TODO: to and from steps can modulate other steps, so should be moved from the 'add' steps module, into their own


exports.addE = addE;

var to = function to(_to) {
  return function (getCurrentContext) {
    return function (args) {
      _to = (0, _traverser.ensureIsArray)(_to);
      return getCurrentContext(_objectSpread({
        out: _to
      }, args));
    };
  };
};

exports.to = to;

var from = function from(_from) {
  return function (getCurrentContext) {
    return function (args) {
      _from = (0, _traverser.ensureIsArray)(_from);
      return getCurrentContext(_objectSpread({
        in: _from
      }, args));
    };
  };
};

exports.from = from;
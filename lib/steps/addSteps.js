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
        var id = (props === null || props === void 0 ? void 0 : props.id) ? props.id : (0, _uuid.v4)();
        if (props === null || props === void 0 ? void 0 : props.id) delete props.id;
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
      }); // if there are no veritces to add an edge to
      // create a dummy and hope(!) we have a 'to' and a 'from' to work with

      if (vs.length === 0) vs.push({
        labels: [],
        objects: []
      });
      var travIsIn = !myArgs.in;
      var travIsOut = !myArgs.out;
      if (myArgs.in) myArgs.in = (0, _traverser.resolveTraverserArg)(myArgs.in, context, true);
      if (myArgs.out) myArgs.out = (0, _traverser.resolveTraverserArg)(myArgs.out, context, true);
      resolveLabelArgs(myArgs, context);

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
            var inId = travIsIn ? t.current.id : idOrVal(in_);
            var outId = travIsOut ? t.current.id : idOrVal(out);
            var id = (props === null || props === void 0 ? void 0 : props.id) ? props.id : (0, _uuid.v4)();
            if (props === null || props === void 0 ? void 0 : props.id) delete props.id;
            var e = {
              label: label,
              id: id,
              inV: inId,
              outV: outId,
              inVLabel: context.graph.vertices.find(function (v) {
                return v.id === inId;
              }).label,
              outVLabel: context.graph.vertices.find(function (v) {
                return v.id === outId;
              }).label,
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
        in: _to
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
        out: _from
      }, args));
    };
  };
};

exports.from = from;

function resolveLabelArgs(inOutArgs, context) {
  if (inOutArgs.in) inOutArgs.in = inOutArgs.in.flatMap(function (i) {
    return resolveLabelArgToId(i, context);
  });
  if (inOutArgs.out) inOutArgs.out = inOutArgs.out.flatMap(function (i) {
    return resolveLabelArgToId(i, context);
  });
}

function resolveLabelArgToId(arg, context) {
  var ids = context.traversers.map(function (t) {
    var idx = t.labels.findIndex(function (tl) {
      return tl.includes(arg);
    });
    var id = idx >= 0 ? t.objects[idx].id : arg;
    return id;
  });
  return ids;
}
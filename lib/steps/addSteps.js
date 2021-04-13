"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.from_Text = exports.from = exports.to_Text = exports.to = exports.addE_Text = exports.addE = exports.addV_Text = exports.addV = void 0;

var _uuid = require("uuid");

var _traverser = require("../traverser");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function sanitise(val) {
  var isNumber = typeof val === 'number';
  if (typeof val === 'string') return "'".concat(val.replace(/[\\]/g, "\\\\'").replace(/[']/g, "\\'"), "'");else return isNumber ? val : "'".concat(val, "'");
}

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

var addV_Text = function addV_Text(label, props) {
  var nonObjProps = Object.keys(props).filter(function (p) {
    return _typeof(props[p]) !== 'object' && (props[p] || typeof props[p] !== 'string');
  }).map(function (p) {
    return "'".concat(p, "', ").concat(sanitise(props[p]));
  }).join(', ');
  var steps = ["addV('label', '".concat(label, "'").concat(nonObjProps ? ',' : '', " ").concat(nonObjProps, ")")];
  if (props) Object.keys(props).forEach(function (p) {
    if (props[p]) if (_typeof(props[p]) === 'object') {
      var keyValsList = Object.keys(props[p]).map(function (k) {
        return "'".concat(k, "', ").concat(sanitise(props[p][k]));
      }).join(', ');
      steps.push("property(list, '".concat(p, "', 'list', ").concat(keyValsList, ")"));
    } //    else
    //        steps.push(`property('${p}', '${sanitise(props[p])}')`)
  });
  return steps.join('.');
};

exports.addV_Text = addV_Text;

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
      // and we have a 'to' and a 'from' to work with
      // create a dummy traverser to allow edges to be added
      // NB: I don't think gremlin (at least on CosmosDB allows this)

      if (myArgs.in && myArgs.out && vs.length === 0) vs.push({
        labels: [],
        objects: []
      });
      var travIsIn = !myArgs.in;
      var travIsOut = !myArgs.out;
      var ts = vs.flatMap(function (t) {
        // if the 'to' or 'from' modulators have inner traversals, we should
        // execute them for each traverser (important if there add adds or other side effect behaviours)
        var tArgs = _objectSpread({}, myArgs);

        if (tArgs.in) tArgs.in = (0, _traverser.resolveTraverserArg)(tArgs.in, context, false);
        if (tArgs.out) tArgs.out = (0, _traverser.resolveTraverserArg)(tArgs.out, context, false); // 'to' and 'from' might include labels, that need resolving into ids

        resolveLabelArgs(tArgs, context);

        var ft = _objectSpread({
          out: [undefined],
          in: [undefined]
        }, tArgs);

        var idOrVal = function idOrVal(x) {
          return x.id ? x.id : x;
        }; // support multiple 'to's and 'froms' to create multiple edges
        // and map from the original traverser


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
};

exports.addE = addE;

var addE_Text = function addE_Text(label, props) {
  var steps = ["addE('".concat(label, "')")];
  if (props) Object.keys(props).forEach(function (p) {
    steps.push("property('".concat(p, "', '").concat(props[p], "')"));
  });
  return steps.join('.');
}; // TODO: to and from steps can modulate other steps, so should be moved from the 'add' steps module, into their own


exports.addE_Text = addE_Text;

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

var to_Text = function to_Text(to) {
  var t = to.getText ? to.getText() : "'".concat(to, "'");
  var steps = ["to(".concat(t, ")")];
  return steps.join('.');
};

exports.to_Text = to_Text;

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

var from_Text = function from_Text(from) {
  var f = from.getText ? from.getText() : "'".concat(from, "'");
  var steps = ["from(".concat(f, ")")];
  return steps.join('.');
};

exports.from_Text = from_Text;

function resolveLabelArgs(inOutArgs, context) {
  // only resolve if it is a lable/id, not if it is already an object
  if (inOutArgs.in) inOutArgs.in = inOutArgs.in.flatMap(function (i) {
    return i.id ? i : resolveLabelArgToId(i, context);
  });
  if (inOutArgs.out) inOutArgs.out = inOutArgs.out.flatMap(function (i) {
    return i.id ? i : resolveLabelArgToId(i, context);
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
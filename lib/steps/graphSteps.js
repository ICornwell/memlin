"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.e_Text = exports.E = exports.v_Text = exports.V = void 0;

var _traverser = require("../traverser");

var V = function V(id) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var ts = context.traversers.flatMap(function (t) {
        var vs = id ? [context.graph.vertices.find(function (v) {
          return v.id === id;
        })] : context.graph.vertices;
        return vs.map(function (v) {
          return (0, _traverser.updateTraverser)(t, v, args);
        });
      });
      return (0, _traverser.updateContext)(context, ts);
    };
  };
};

exports.V = V;

var v_Text = function v_Text(id) {
  var inner = id ? "'".concat(id, "'") : '';
  var steps = ["v(".concat(inner, ")")];
  return steps.join('.');
};

exports.v_Text = v_Text;

var E = function E(id) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var ts = context.traversers.flatMap(function (t) {
        var es = id ? [context.graph.edges.find(function (v) {
          return v.id === id;
        })] : context.graph.edges;
        return es.map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      });
      return (0, _traverser.updateContext)(context, ts);
    };
  };
};

exports.E = E;

var e_Text = function e_Text(id) {
  var inner = id ? "'".concat(id, "'") : '';
  var steps = ["E(".concat(inner, ")")];
  return steps.join('.');
};

exports.e_Text = e_Text;
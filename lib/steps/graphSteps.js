"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.E = exports.V = void 0;

var _traverser = require("../traverser");

var V = function V(id) {
  return function (getCurrentContext) {
    return function (args) {
      var traverser = getCurrentContext(args);
      var s = id ? [traverser.g.vertices.find(function (v) {
        return v.id === id;
      })] : traverser.g.vertices;
      (0, _traverser.updateTraverser)(traverser, s, args);
      return traverser;
    };
  };
};

exports.V = V;

var E = function E(id) {
  return function (getCurrentContext) {
    return function (args) {
      var s = id ? [traverser.g.edges.find(function (e) {
        return e.id === id;
      })] : traverser.g.edges;
      (0, _traverser.updateTraverser)(traverser, s, args);
      return traverser;
    };
  };
};

exports.E = E;
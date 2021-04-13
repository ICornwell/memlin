"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drop_Text = exports.drop = void 0;

var _traverser = require("../traverser");

var drop = function drop() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      context.traversers.forEach(function (t) {
        if (t.current && t.current.label && !t.current.outV) {
          // is a vertex
          context.graph.vertices = context.graph.vertices.filter(function (v) {
            return v.id !== t.current.id;
          });
          context.graph.edges = context.graph.edges.filter(function (e) {
            return e.outV !== t.current.id && e.inV !== t.current.id;
          });
        } else if (t.current && t.current.label && t.current.outV) // is an edge
          context.graph.edges = context.graph.edges.filter(function (e) {
            return e.id !== t.current.id;
          });else // TODO: should support dropping properties too
          console.log('drop other');
      });
      var newTraverser = {
        labels: [],
        objects: []
      };
      var results = [newTraverser];
      return (0, _traverser.updateContext)(context, results);
    };
  };
};

exports.drop = drop;

var drop_Text = function drop_Text() {
  var steps = ["drop()"];
  return steps.join('.');
};

exports.drop_Text = drop_Text;
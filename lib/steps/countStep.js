"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.count_Text = exports.count = void 0;

var _traverser = require("../traverser");

var count = function count() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var count = context.traversers.length;
      var newTraverser = {
        labels: [],
        objects: []
      };
      var results = [(0, _traverser.updateTraverser)(newTraverser, {
        value: count
      }, args)];
      return (0, _traverser.updateContext)(context, results);
    };
  };
};

exports.count = count;

var count_Text = function count_Text() {
  var steps = ["count()"];
  return steps.join('.');
};

exports.count_Text = count_Text;
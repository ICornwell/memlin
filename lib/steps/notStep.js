"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.not_Text = exports.not = void 0;

var _traverser = require("../traverser");

var not = function not(steps) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = context.traversers.filter(function (t) {
        var localContext = {
          graph: context.graph,
          traversers: [t]
        };
        var inner = (0, _traverser.resolveTraverserArg)(steps, localContext, true);
        return inner.length === 0;
      });
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};

exports.not = not;

var not_Text = function not_Text(notSteps) {
  var steps = "not(".concat(notSteps.getText(), ")");
  return steps;
};

exports.not_Text = not_Text;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union = void 0;

var _traverser = require("../traverser");

var union = function union(stepsSet) {
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
        var ts = stepsSet.flatMap(function (steps) {
          return (0, _traverser.resolveTraverserArg)(steps, localContext, true).map(function (o) {
            return (0, _traverser.updateTraverser)(t, o, args);
          });
        });
        return ts;
      });
      return (0, _traverser.updateContext)(context, results);
    };
  };
};

exports.union = union;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union_Text = exports.union = void 0;

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

var union_Text = function union_Text() {
  for (var _len = arguments.length, uSteps = new Array(_len), _key = 0; _key < _len; _key++) {
    uSteps[_key] = arguments[_key];
  }

  var inner = uSteps ? uSteps.map(function (s) {
    return s.getText();
  }).join(', ') : '';
  var steps = ["union(".concat(inner, ")")];
  return steps.join('.');
};

exports.union_Text = union_Text;
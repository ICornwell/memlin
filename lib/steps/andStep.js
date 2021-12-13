"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.and_Text = exports.and = void 0;

var _traverser = require("../traverser");

var and = function and() {
  for (var _len = arguments.length, steps = new Array(_len), _key = 0; _key < _len; _key++) {
    steps[_key] = arguments[_key];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = context.traversers.filter(function (t) {
        var localContext = {
          graph: context.graph,
          traversers: [t]
        };
        return steps.every(function (step) {
          var inner = (0, _traverser.resolveTraverserArg)(step, localContext, true);
          return inner.length > 0;
        });
      });
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};

exports.and = and;

var and_Text = function and_Text() {
  for (var _len2 = arguments.length, andSteps = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    andSteps[_key2] = arguments[_key2];
  }

  var inner = andSteps ? andSteps.map(function (s) {
    return s.getText();
  }).join(', ') : '';
  var steps = ["and(".concat(inner, ")")];
  return steps.join('.');
};

exports.and_Text = and_Text;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.or_Text = exports.or = void 0;

var _traverser = require("../traverser");

var or = function or() {
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
        return steps.some(function (step) {
          var inner = (0, _traverser.resolveTraverserArg)(step, localContext, true);
          return inner.length > 0;
        });
      });
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};

exports.or = or;

var or_Text = function or_Text() {
  for (var _len2 = arguments.length, orSteps = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    orSteps[_key2] = arguments[_key2];
  }

  var inner = orSteps ? orSteps.map(function (s) {
    return s.getText();
  }).join(', ') : '';
  var steps = ["or(".concat(inner, ")")];
  return steps.join('.');
};

exports.or_Text = or_Text;
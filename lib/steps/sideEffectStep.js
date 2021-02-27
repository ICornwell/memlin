"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sideEffect = void 0;

var _traverser = require("../traverser");

var sideEffect = function sideEffect(steps) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args); // to do, repeat the step for each traverser

      var se = (0, _traverser.resolveTraverserArg)(steps, context, true);
      return context;
    };
  };
};

exports.sideEffect = sideEffect;
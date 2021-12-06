"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limit_Text = exports.limit = void 0;

var _traverser = require("../traverser");

var limit = function limit(max) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var limited = context.traversers.length <= max ? context.traversers : context.traversers.slice(0, max);
      return (0, _traverser.updateContext)(context, limited);
    };
  };
};

exports.limit = limit;

var limit_Text = function limit_Text(max) {
  var steps = ["limit(".concat(max, ")")];
  return steps.join('.');
};

exports.limit_Text = limit_Text;
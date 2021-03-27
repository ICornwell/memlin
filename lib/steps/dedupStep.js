"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedup_Text = exports.dedup = void 0;

var _traverser = require("../traverser");

function onlyIdsUnique(value, index, self) {
  return self.findIndex(function (t) {
    return t.current.id === value.current.id;
  }) === index;
}

var dedup = function dedup() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var filtered = context.traversers.filter(onlyIdsUnique);
      return (0, _traverser.updateContext)(context, filtered);
    };
  };
};

exports.dedup = dedup;

var dedup_Text = function dedup_Text() {
  var steps = ["dedup()"];
  return steps.join('.');
};

exports.dedup_Text = dedup_Text;
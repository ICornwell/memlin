"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newTraverser = newTraverser;

var _graph = require("./graph");

var _uuid = require("uuid");

function newTraverser(graph) {
  var stream = [[]];
  var t = {
    graph: graph,
    tLabels: [],
    stream: stream
  };

  function step(stepFn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var r = stepFn.apply(void 0, [t].concat(args));
    t.stream.unshift(r);
    return t;
  }

  t.addV = function (label, props) {
    return step(_graph.addVertex, (0, _uuid.v4)(), label, props);
  };

  return t;
}
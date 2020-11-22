"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.G = G;

var _traverser = require("./traverser");

var _addSteps = require("./steps/addSteps");

var _graphSteps = require("./steps/graphSteps");

var _hasSteps = require("./steps/hasSteps");

var _vertexSteps = require("./steps/vertexSteps");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function G() {
  var g = {
    context: {
      graph: _traverser.newGraph
    }
  }; // run the query with the graph and a new, empty traversal list

  g.execute = function (graph) {
    g.context.graph = graph;
    g.context.s = [[]];
    return g.query(g.context);
  };

  g.subQuery = function (context) {
    // run the subquery for the same graph, but create a new traversal list
    // based on a copy of the head of the parent query
    g.context.graph = context.graph;
    g.context.s = _toConsumableArray(context.s[0]);
    return g.query().s[0];
  };

  g.query = function () {
    return (0, _traverser.G)(g.context.graph);
  }; // boilder-plate addition of all the steps to create the fluent chaining methods


  g.addV = function (label, props) {
    g.query = (0, _addSteps.addV)(label, props)(g.query);
    return g;
  };

  g.addE = function (label, props) {
    g.query = (0, _addSteps.addE)(label, props)(g.query);
    return g;
  };

  g.to = function (vertex) {
    g.query = (0, _addSteps.to)(vertex)(g.query);
    return g;
  };

  g.from = function (vertex) {
    g.query = (0, _addSteps.from)(vertex)(g.query);
    return g;
  };

  g.V = function (id) {
    g.query = (0, _graphSteps.V)(id)(g.query);
    return g;
  };

  g.E = function (id) {
    g.query = (0, _graphSteps.E)(id)(g.query);
    return g;
  };

  g.has = function () {
    g.query = _hasSteps.has.apply(void 0, arguments)(g.query);
    return g;
  };

  g.hasLabel = function () {
    g.query = _hasSteps.hasLabel.apply(void 0, arguments)(g.query);
    return g;
  };

  g.hasKey = function () {
    g.query = _hasSteps.hasKey.apply(void 0, arguments)(g.query);
    return g;
  };

  g.out = function () {
    g.query = _vertexSteps.out.apply(void 0, arguments)(g.query);
    return g;
  };

  g.in_ = function () {
    g.query = _vertexSteps.in_.apply(void 0, arguments)(g.query);
    return g;
  };

  g.both = function () {
    g.query = _vertexSteps.both.apply(void 0, arguments)(g.query);
    return g;
  };

  g.outE = function () {
    g.query = _vertexSteps.outE.apply(void 0, arguments)(g.query);
    return g;
  };

  g.inE = function () {
    g.query = _vertexSteps.inE.apply(void 0, arguments)(g.query);
    return g;
  };

  g.bothE = function () {
    g.query = _vertexSteps.bothE.apply(void 0, arguments)(g.query);
    return g;
  };

  g.outV = function () {
    g.query = (0, _vertexSteps.outV)()(g.query);
    return g;
  };

  g.inV = function () {
    g.query = (0, _vertexSteps.inV)()(g.query);
    return g;
  };

  g.bothV = function () {
    g.query = (0, _vertexSteps.bothV)()(g.query);
    return g;
  };

  return g;
}
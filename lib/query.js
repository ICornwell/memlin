"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.g = g;

var _traverser = require("./traverser");

var _addSteps = require("./steps/addSteps");

var _graphSteps = require("./steps/graphSteps");

var _hasSteps = require("./steps/hasSteps");

var _vertexSteps = require("./steps/vertexSteps");

var _asSelectSteps = require("./steps/asSelectSteps");

var _sideEffectStep = require("./steps/sideEffectStep");

var _unionStep = require("./steps/unionStep");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function g(gToClone) {
  var query = {
    context: {
      graph: _traverser.newGraph
    }
  }; // run the query with the graph and a new, empty traversal list

  query.executeRawOut = function (graph) {
    query.context.graph = graph;
    return query.query(query.context);
  };

  query.execute = function (graph) {
    query.context.graph = graph;
    var raw = query.query(query.context);
    var out = raw.traversers.map(function (t) {
      return t.current;
    });
    return out;
  };

  query.subQuery = function (context, copyTraversers) {
    // run the subquery for the same graph, but create a new traversal list
    // based on a copy of the head of the parent query
    // copy traversers allows the subquery to execute using the traversers
    // from the outer context
    query.context.graph = context.graph;
    if (copyTraversers) query.context.traversers = _toConsumableArray(context.traversers);
    return query.query().traversers.map(function (t) {
      return t.current;
    });
  }; // note: query.context.traversers will be undefined unless the (above) subquery
  // was told to copy them from an out query


  if (!gToClone) query.query = function () {
    return (0, _traverser.G)(query.context.graph, query.context.traversers);
  };else {
    query.query = gToClone.query;
    query.context = gToClone.context;
  } // boilder-plate addition of all the steps to create the fluent chaining methods

  query.addV = function (label, props) {
    query.query = (0, _addSteps.addV)(label, props)(query.query);
    return query;
  };

  query.addE = function (label, props) {
    query.query = (0, _addSteps.addE)(label, props)(query.query);
    return query;
  };

  query.to = function (vertex) {
    query.query = (0, _addSteps.to)(vertex)(query.query);
    return query;
  };

  query.from = function (vertex) {
    query.query = (0, _addSteps.from)(vertex)(query.query);
    return query;
  };

  query.V = function (id) {
    query.query = (0, _graphSteps.V)(id)(query.query);
    return query;
  };

  query.E = function (id) {
    query.query = (0, _graphSteps.E)(id)(query.query);
    return query;
  };

  query.has = function () {
    query.query = _hasSteps.has.apply(void 0, arguments)(query.query);
    return query;
  };

  query.hasLabel = function () {
    query.query = _hasSteps.hasLabel.apply(void 0, arguments)(query.query);
    return query;
  };

  query.hasKey = function () {
    query.query = _hasSteps.hasKey.apply(void 0, arguments)(query.query);
    return query;
  };

  query.out = function () {
    query.query = _vertexSteps.out.apply(void 0, arguments)(query.query);
    return query;
  };

  query.in_ = function () {
    query.query = _vertexSteps.in_.apply(void 0, arguments)(query.query);
    return query;
  };

  query.both = function () {
    query.query = _vertexSteps.both.apply(void 0, arguments)(query.query);
    return query;
  };

  query.outE = function () {
    query.query = _vertexSteps.outE.apply(void 0, arguments)(query.query);
    return query;
  };

  query.inE = function () {
    query.query = _vertexSteps.inE.apply(void 0, arguments)(query.query);
    return query;
  };

  query.bothE = function () {
    query.query = _vertexSteps.bothE.apply(void 0, arguments)(query.query);
    return query;
  };

  query.outV = function () {
    query.query = (0, _vertexSteps.outV)()(query.query);
    return query;
  };

  query.inV = function () {
    query.query = (0, _vertexSteps.inV)()(query.query);
    return query;
  };

  query.bothV = function () {
    query.query = (0, _vertexSteps.bothV)()(query.query);
    return query;
  };

  query.as = function () {
    query.query = _asSelectSteps.as.apply(void 0, arguments)(query.query);
    return query;
  };

  query.select = function () {
    query.query = _asSelectSteps.select.apply(void 0, arguments)(query.query);
    return query;
  };

  query.by = function (byArgs) {
    query.query = (0, _asSelectSteps.by)(byArgs)(query.query);
    return query;
  };

  query.sideEffect = function (steps) {
    query.query = (0, _sideEffectStep.sideEffect)(steps)(query.query);
    return query;
  };

  query.union = function () {
    for (var _len = arguments.length, stepsSet = new Array(_len), _key = 0; _key < _len; _key++) {
      stepsSet[_key] = arguments[_key];
    }

    query.query = (0, _unionStep.union)(stepsSet)(query.query);
    return query;
  };

  return query;
}
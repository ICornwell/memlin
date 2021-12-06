"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = exports.__ = exports.g = void 0;

require("regenerator-runtime/runtime");

var _traverser = require("./traverser");

var _addSteps = require("./steps/addSteps");

var _graphSteps = require("./steps/graphSteps");

var _hasSteps = require("./steps/hasSteps");

var _vertexSteps = require("./steps/vertexSteps");

var _asSelectSteps = require("./steps/asSelectSteps");

var _sideEffectStep = require("./steps/sideEffectStep");

var _unionStep = require("./steps/unionStep");

var _dedupStep = require("./steps/dedupStep");

var _coalesceStep = require("./steps/coalesceStep");

var _countStep = require("./steps/countStep");

var _dropStep = require("./steps/dropStep");

var _limitStep = require("./steps/limitStep");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var g = gr('g.');
exports.g = g;

var __ = gr('__.');

exports.__ = __;

var _ = gr('');

exports._ = _;

function gr(anonTraversers) {
  return function (gToClone) {
    var query = {};
    var queryString = gToClone ? _toConsumableArray(gToClone.getTextArray()) : []; // run the query with the graph and a new, empty traversal list

    query.executeRawOut = function (graph) {
      return query.query({
        initGraph: graph
      });
    };

    query.execute = function (graph) {
      var raw = query.query({
        initGraph: graph
      });
      var out = raw.traversers.map(function (t) {
        return t.current;
      });
      return out;
    };

    query.getText = function () {
      return anonTraversers + queryString.join('.');
    };

    query.getTextArray = function () {
      return queryString;
    };

    query.subQuery = function (context, copyTraversers) {
      // run the subquery for the same graph, but create a new traversal list
      // based on a copy of the head of the parent query
      // 'copyTraversers' allows the subquery to execute using the traversers
      // from the outer context
      var args = {
        initGraph: context.graph,
        initTraversers: copyTraversers ? _toConsumableArray(context.traversers) : null
      };
      return query.query(args).traversers.map(function (t) {
        return t.current;
      });
    }; // note: query.context.traversers will be undefined unless the (above) subquery
    // was told to copy them from an out query


    if (!gToClone) query.query = function (args) {
      return (0, _traverser.G)(args);
    };else query.query = gToClone.query; // boilder-plate addition of all the steps to create the fluent chaining methods

    query.addV = function (label, props) {
      query.query = (0, _addSteps.addV)(label, props)(query.query);
      queryString.push((0, _addSteps.addV_Text)(label, props));
      return query;
    };

    query.addE = function (label, props) {
      query.query = (0, _addSteps.addE)(label, props)(query.query);
      queryString.push((0, _addSteps.addE_Text)(label, props));
      return query;
    };

    query.to = function (vertex) {
      query.query = (0, _addSteps.to)(vertex)(query.query);
      queryString.push((0, _addSteps.to_Text)(vertex));
      return query;
    };

    query.from = function (vertex) {
      query.query = (0, _addSteps.from)(vertex)(query.query);
      queryString.push((0, _addSteps.from_Text)(vertex));
      return query;
    };

    query.V = function (id) {
      query.query = (0, _graphSteps.V)(id)(query.query);
      queryString.push((0, _graphSteps.v_Text)(id));
      return query;
    };

    query.E = function (id) {
      query.query = (0, _graphSteps.E)(id)(query.query);
      queryString.push((0, _graphSteps.e_Text)(id));
      return query;
    };

    query.has = function () {
      query.query = _hasSteps.has.apply(void 0, arguments)(query.query);
      queryString.push(_hasSteps.has_Text.apply(void 0, arguments));
      return query;
    };

    query.hasLabel = function () {
      query.query = _hasSteps.hasLabel.apply(void 0, arguments)(query.query);
      queryString.push(_hasSteps.hasLabel_Text.apply(void 0, arguments));
      return query;
    };

    query.hasKey = function () {
      query.query = _hasSteps.hasKey.apply(void 0, arguments)(query.query);
      queryString.push(_hasSteps.hasKey_Text.apply(void 0, arguments));
      return query;
    };

    query.out = function () {
      query.query = _vertexSteps.out.apply(void 0, arguments)(query.query);
      queryString.push(_vertexSteps.out_Text.apply(void 0, arguments));
      return query;
    };

    query.in_ = function () {
      query.query = _vertexSteps.in_.apply(void 0, arguments)(query.query);
      queryString.push(_vertexSteps.in_Text.apply(void 0, arguments));
      return query;
    };

    query.both = function () {
      query.query = _vertexSteps.both.apply(void 0, arguments)(query.query);
      queryString.push(_vertexSteps.both_Text.apply(void 0, arguments));
      return query;
    };

    query.outE = function () {
      query.query = _vertexSteps.outE.apply(void 0, arguments)(query.query);
      queryString.push(_vertexSteps.outE_Text.apply(void 0, arguments));
      return query;
    };

    query.inE = function () {
      query.query = _vertexSteps.inE.apply(void 0, arguments)(query.query);
      queryString.push(_vertexSteps.inE_Text.apply(void 0, arguments));
      return query;
    };

    query.bothE = function () {
      query.query = _vertexSteps.bothE.apply(void 0, arguments)(query.query);
      queryString.push(_vertexSteps.bothE_Text.apply(void 0, arguments));
      return query;
    };

    query.outV = function () {
      query.query = (0, _vertexSteps.outV)()(query.query);
      queryString.push((0, _vertexSteps.outV_Text)());
      return query;
    };

    query.inV = function () {
      query.query = (0, _vertexSteps.inV)()(query.query);
      queryString.push((0, _vertexSteps.inV_Text)());
      return query;
    };

    query.bothV = function () {
      query.query = (0, _vertexSteps.bothV)()(query.query);
      queryString.push((0, _vertexSteps.bothV_Text)());
      return query;
    };

    query.as = function () {
      query.query = _asSelectSteps.as.apply(void 0, arguments)(query.query);
      queryString.push(_asSelectSteps.as_Text.apply(void 0, arguments));
      return query;
    };

    query.select = function () {
      query.query = _asSelectSteps.select.apply(void 0, arguments)(query.query);
      queryString.push(_asSelectSteps.select_Text.apply(void 0, arguments));
      return query;
    };

    query.by = function () {
      query.query = _asSelectSteps.by.apply(void 0, arguments)(query.query);
      queryString.push(_asSelectSteps.by_Text.apply(void 0, arguments));
      return query;
    };

    query.sideEffect = function (steps) {
      query.query = (0, _sideEffectStep.sideEffect)(steps)(query.query);
      queryString.push((0, _sideEffectStep.sideEffect_Text)(steps));
      return query;
    };

    query.union = function () {
      for (var _len = arguments.length, stepsSet = new Array(_len), _key = 0; _key < _len; _key++) {
        stepsSet[_key] = arguments[_key];
      }

      query.query = (0, _unionStep.union)(stepsSet)(query.query);
      queryString.push(_unionStep.union_Text.apply(void 0, stepsSet));
      return query;
    };

    query.coalesce = function () {
      for (var _len2 = arguments.length, stepsSet = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        stepsSet[_key2] = arguments[_key2];
      }

      query.query = (0, _coalesceStep.coalesce)(stepsSet)(query.query);
      queryString.push(_coalesceStep.coalesce_Text.apply(void 0, stepsSet));
      return query;
    };

    query.dedup = function () {
      query.query = (0, _dedupStep.dedup)()(query.query);
      queryString.push((0, _dedupStep.dedup_Text)());
      return query;
    };

    query.limit = function (max) {
      query.query = (0, _limitStep.limit)(max)(query.query);
      queryString.push((0, _limitStep.limit_Text)(max));
      return query;
    };

    query.count = function () {
      query.query = (0, _countStep.count)()(query.query);
      queryString.push((0, _countStep.count_Text)());
      return query;
    };

    query.drop = function () {
      query.query = (0, _dropStep.drop)()(query.query);
      queryString.push((0, _dropStep.drop_Text)());
      return query;
    };

    return query;
  };
}
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

var _notStep = require("./steps/notStep");

var _andStep = require("./steps/andStep");

var _orStep = require("./steps/orStep");

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
    };else query.query = gToClone.query;

    var queryFunc = function queryFunc(step, stepText) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return queryStepBuilder.apply(void 0, [query, queryString, step, stepText].concat(args));
    }; // boilder-plate addition of all the steps to create the fluent chaining methods


    query.addV = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return queryFunc.apply(void 0, [_addSteps.addV, _addSteps.addV_Text].concat(args));
    };

    query.addE = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return queryFunc.apply(void 0, [_addSteps.addE, _addSteps.addE_Text].concat(args));
    };

    query.to = function (vertex) {
      return queryFunc(_addSteps.to, _addSteps.to_Text, vertex);
    };

    query.from = function (vertex) {
      return queryFunc(_addSteps.from, _addSteps.from_Text, vertex);
    };

    query.V = function (id) {
      return queryFunc(_graphSteps.V, _graphSteps.v_Text, id);
    };

    query.E = function (id) {
      return queryFunc(_graphSteps.E, _graphSteps.e_Text, id);
    }; //  query.has = (...hasArgs) => queryFunc(has(...hasArgs, has_Text, ...hasArgs)


    query.has = function () {
      for (var _len4 = arguments.length, hasArgs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        hasArgs[_key4] = arguments[_key4];
      }

      return queryFunc.apply(void 0, [_hasSteps.has, _hasSteps.has_Text].concat(hasArgs));
    };

    query.hasLabel = function () {
      for (var _len5 = arguments.length, hasArgs = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        hasArgs[_key5] = arguments[_key5];
      }

      return queryFunc.apply(void 0, [_hasSteps.hasLabel, _hasSteps.hasLabel_Text].concat(hasArgs));
    };

    query.hasKey = function () {
      for (var _len6 = arguments.length, hasArgs = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        hasArgs[_key6] = arguments[_key6];
      }

      return queryFunc.apply(void 0, [_hasSteps.hasKey, _hasSteps.hasKey_Text].concat(hasArgs));
    };

    query.out = function () {
      for (var _len7 = arguments.length, labels = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        labels[_key7] = arguments[_key7];
      }

      return queryFunc.apply(void 0, [_vertexSteps.out, _vertexSteps.out_Text].concat(labels));
    };

    query.in_ = function () {
      for (var _len8 = arguments.length, labels = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        labels[_key8] = arguments[_key8];
      }

      return queryFunc.apply(void 0, [_vertexSteps.in_, _vertexSteps.in_Text].concat(labels));
    };

    query.both = function () {
      for (var _len9 = arguments.length, labels = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        labels[_key9] = arguments[_key9];
      }

      return queryFunc.apply(void 0, [_vertexSteps.both, _vertexSteps.both_Text].concat(labels));
    };

    query.outE = function () {
      for (var _len10 = arguments.length, labels = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        labels[_key10] = arguments[_key10];
      }

      return queryFunc.apply(void 0, [_vertexSteps.outE, _vertexSteps.outE_Text].concat(labels));
    };

    query.inE = function () {
      for (var _len11 = arguments.length, labels = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        labels[_key11] = arguments[_key11];
      }

      return queryFunc.apply(void 0, [_vertexSteps.inE, _vertexSteps.inE_Text].concat(labels));
    };

    query.bothE = function () {
      for (var _len12 = arguments.length, labels = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        labels[_key12] = arguments[_key12];
      }

      return queryFunc.apply(void 0, [_vertexSteps.bothE, _vertexSteps.bothE_Text].concat(labels));
    };

    query.outV = function () {
      return queryFunc(_vertexSteps.outV, _vertexSteps.outV_Text);
    };

    query.inV = function () {
      return queryFunc(_vertexSteps.inV, _vertexSteps.inV_Text);
    };

    query.bothV = function () {
      return queryFunc(_vertexSteps.bothV, _vertexSteps.bothV_Text);
    };

    query.as = function () {
      for (var _len13 = arguments.length, labels = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        labels[_key13] = arguments[_key13];
      }

      return queryFunc.apply(void 0, [_asSelectSteps.as, _asSelectSteps.as_Text].concat(labels));
    };

    query.select = function () {
      for (var _len14 = arguments.length, labels = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        labels[_key14] = arguments[_key14];
      }

      return queryFunc.apply(void 0, [_asSelectSteps.select, _asSelectSteps.select_Text].concat(labels));
    };

    query.by = function () {
      for (var _len15 = arguments.length, byArgs = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        byArgs[_key15] = arguments[_key15];
      }

      return queryFunc.apply(void 0, [_asSelectSteps.by, _asSelectSteps.by_Text].concat(byArgs));
    };

    query.sideEffect = function (steps) {
      return queryFunc(_sideEffectStep.sideEffect, _sideEffectStep.sideEffect_Text, steps);
    };

    query.union = function () {
      for (var _len16 = arguments.length, stepsSet = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        stepsSet[_key16] = arguments[_key16];
      }

      return queryFunc.apply(void 0, [_unionStep.union, _unionStep.union_Text].concat(stepsSet));
    };

    query.coalesce = function () {
      for (var _len17 = arguments.length, stepsSet = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        stepsSet[_key17] = arguments[_key17];
      }

      return queryFunc.apply(void 0, [_coalesceStep.coalesce, _coalesceStep.coalesce_Text].concat(stepsSet));
    };

    query.dedup = function () {
      return queryFunc(_dedupStep.dedup, _dedupStep.dedup_Text);
    };

    query.limit = function (max) {
      return queryFunc(_limitStep.limit, _limitStep.limit_Text, max);
    };

    query.not = function (steps) {
      return queryFunc(_notStep.not, _notStep.not_Text, steps);
    };

    query.and = function () {
      for (var _len18 = arguments.length, steps = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
        steps[_key18] = arguments[_key18];
      }

      return queryFunc.apply(void 0, [_andStep.and, _andStep.and_Text].concat(steps));
    };

    query.or = function () {
      for (var _len19 = arguments.length, steps = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
        steps[_key19] = arguments[_key19];
      }

      return queryFunc.apply(void 0, [_orStep.or, _orStep.or_Text].concat(steps));
    };

    query.count = function () {
      return queryFunc(_countStep.count, _countStep.count_Text);
    };

    query.drop = function () {
      return queryFunc(_dropStep.drop, _dropStep.drop_Text);
    };

    return query;
  };
}

function queryStepBuilder(query, queryString, step, stepText) {
  for (var _len20 = arguments.length, args = new Array(_len20 > 4 ? _len20 - 4 : 0), _key20 = 4; _key20 < _len20; _key20++) {
    args[_key20 - 4] = arguments[_key20];
  }

  query.query = step.apply(void 0, args)(query.query);
  queryString.push(stepText.apply(void 0, args));
  return query;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTraverser = updateTraverser;
exports.updateContext = updateContext;
exports.isV = isV;
exports.isE = isE;
exports.ensureIsArray = ensureIsArray;
exports.resolveTraverserArg = resolveTraverserArg;
exports.G = exports.newGraph = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var newGraph = {
  edges: [],
  vertices: []
};
exports.newGraph = newGraph;

var G = function G(g) {
  var context = {
    graph: g ? g : newGraph
  };
  var emptyInitialTraverser = {
    labels: [],
    objects: []
  };
  var initialisedTraversers = [updateTraverser(emptyInitialTraverser)];
  return updateContext(context, initialisedTraversers);
}; // G is a function that gets a new traverser
// the following functions take some local args and returns a function thats the current
// traverser and returns another function that accepts modulator args (or not), and 
// returns a new traverser, with the results of the step
// steps with side-effects produce the side-effect before returnnig the function


exports.G = G;

function updateTraverser(traverser, obj, args) {
  // rewrite the path stream with the new end-state
  // to allow easy access to the current-state by using [0] indexer
  // we keep all the arrays 'backwards'
  var endLabels = [!(args && args.labels) ? [] : args.labels].concat(_toConsumableArray(traverser.labels));
  var end = {
    labels: obj ? endLabels : _toConsumableArray(traverser.labels),
    objects: obj ? [obj].concat(_toConsumableArray(traverser.objects)) : _toConsumableArray(traverser.objects)
  }; // add the 'current' accessor to get the head of the traverser

  end.current = end.objects[0];
  return end;
}

function updateContext(context, newTraversers) {
  var newContext = {
    graph: context.graph,
    traversers: newTraversers
  };
  return newContext;
}

function isV(el) {
  return el.label && el.id && !el.in;
}

function isE(el) {
  return el.label && el.id && el.in;
}

function ensureIsArray(arg) {
  if (!Array.isArray(arg)) arg = [arg];
  return arg;
}

function resolveTraverserArg(arg, context, copyTraversers) {
  var f = Array.isArray(arg) ? arg[0] : arg;
  if (!(f.subQuery && {}.toString.call(f.subQuery) === '[object Function]')) return arg;
  if (f.subQuery) return f.subQuery(context, copyTraversers);
}
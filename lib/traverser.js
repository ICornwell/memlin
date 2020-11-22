"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTraverser = updateTraverser;
exports.updateContext = updateContext;
exports.isV = isV;
exports.isE = isE;
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
  return {
    graph: g ? g : newGraph,
    traversers: [{
      lables: [],
      objects: []
    }]
  };
}; // G is a function that gets a new traverser
// the following functions take some local args and returns a function thats the current
// traverser and returns another function that accepts modulator args (or not), and 
// returns a new traverser, with the results of the step
// steps with side-effects produce the side-effect before returnnig the function


exports.G = G;

function updateTraverser(traverser, obj, args) {
  var _traverser$labels;

  // rewrite the path stream with the new end-state
  // to allow easy access to the current-state by using [0] indexer
  // we keep all the arrays 'backwards'
  var newObjects = _toConsumableArray(traverser.objects);

  newObjects.unshift(obj);
  var end = {
    labels: !args.labels ? traverser.labels : (_traverser$labels = traverser.labels).unshift.apply(_traverser$labels, _toConsumableArray(args.labels)),
    objects: newObjects
  };
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
  return el.label && el.id && !el.to;
}

function isE(el) {
  return el.label && el.id && el.to;
}
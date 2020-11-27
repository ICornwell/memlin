"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bothV = exports.inV = exports.outV = exports.bothE = exports.inE = exports.outE = exports.both = exports.in_ = exports.out = void 0;

var _traverser = require("../traverser");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function labelMatch(labels, item) {
  return labels.length === 0 || labels.includes(item.label);
}

var out = function out() {
  for (var _len = arguments.length, labels = new Array(_len), _key = 0; _key < _len; _key++) {
    labels[_key] = arguments[_key];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.in === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return {
            t: t,
            e: e
          };
        });
      }) // find outbound edges
      .flatMap(function (pair) {
        return context.graph.vertices.filter(function (v) {
          return v.id === pair.e.out;
        }).map(function (v) {
          return (0, _traverser.updateTraverser)(pair.t, v, args);
        });
      }); // find 'to' vertex  

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.out = out;

var in_ = function in_() {
  for (var _len2 = arguments.length, labels = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    labels[_key2] = arguments[_key2];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.out === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return {
            t: t,
            e: e
          };
        });
      }) // find inbound edges
      .flatMap(function (pair) {
        return context.graph.vertices.filter(function (v) {
          return v.id === pair.e.in;
        }) // find 'to' vertex
        .map(function (v) {
          return (0, _traverser.updateTraverser)(pair.t, v, args);
        });
      });
      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.in_ = in_;

var both = function both() {
  for (var _len3 = arguments.length, labels = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    labels[_key3] = arguments[_key3];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var sin = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.out === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return {
            t: t,
            e: e
          };
        });
      }) // find outbound edges
      .flatMap(function (pair) {
        return context.graph.vertices.filter(function (v) {
          return v.id === pair.e.in;
        }).map(function (v) {
          return (0, _traverser.updateTraverser)(pair.t, v, args);
        });
      }); // find 'to' vertex

      var sout = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.in === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return {
            t: t,
            e: e
          };
        });
      }) // find inbound edges
      .flatMap(function (pair) {
        return context.graph.vertices.filter(function (v) {
          return v.id === pair.e.out;
        }).map(function (v) {
          return (0, _traverser.updateTraverser)(pair.t, v, args);
        });
      }); // find 'to' vertex

      return (0, _traverser.updateContext)(context, [].concat(_toConsumableArray(sin), _toConsumableArray(sout)));
    };
  };
};

exports.both = both;

var outE = function outE() {
  for (var _len4 = arguments.length, labels = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    labels[_key4] = arguments[_key4];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.in === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find outbound edges

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.outE = outE;

var inE = function inE() {
  for (var _len5 = arguments.length, labels = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    labels[_key5] = arguments[_key5];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.out === t.current.id && labelMatch(labels, e);
        }) // find inbound edges
        .map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find outbound edges

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.inE = inE;

var bothE = function bothE() {
  for (var _len6 = arguments.length, labels = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    labels[_key6] = arguments[_key6];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return (e.out === t.current.id || e.in === t.current.id) && labelMatch(labels, e);
        }) // find both edges
        .map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find outbound edges

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.bothE = bothE;

var outV = function outV() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isE)(t.current);
      }).flatMap(function (t) {
        return context.graph.vertices.filter(function (v) {
          return t.current.out === v.id;
        }).map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find outbound vertices

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.outV = outV;

var inV = function inV() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isE)(t.current);
      }).flatMap(function (t) {
        return context.graph.vertices.filter(function (v) {
          return t.current.in === v.id;
        }).map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find inbound vertices

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.inV = inV;

var bothV = function bothV() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isE)(t.current);
      }).flatMap(function (t) {
        return context.graph.vertices.filter(function (v) {
          return t.current.out === v.id || t.current.in === v.id;
        }).map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find both vertices

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.bothV = bothV;
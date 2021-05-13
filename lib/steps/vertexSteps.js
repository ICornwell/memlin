"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bothV_Text = exports.bothV = exports.inV_Text = exports.inV = exports.outV_Text = exports.outV = exports.bothE_Text = exports.bothE = exports.inE_Text = exports.inE = exports.outE_Text = exports.outE = exports.both_Text = exports.both = exports.in_Text = exports.in_ = exports.out_Text = exports.out = void 0;

var _traverser = require("../traverser");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

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
          return e.outV === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return {
            t: t,
            e: e
          };
        });
      }) // find outbound edges
      .flatMap(function (pair) {
        return context.graph.vertices.filter(function (v) {
          return v.id === pair.e.inV;
        }).map(function (v) {
          return (0, _traverser.updateTraverser)(pair.t, v, args);
        });
      }); // find 'to' vertex  

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.out = out;

var out_Text = function out_Text() {
  for (var _len2 = arguments.length, labels = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    labels[_key2] = arguments[_key2];
  }

  var inner = labels ? labels.map(function (l) {
    return "'".concat(l, "'");
  }).join(', ') : '';
  var steps = ["out(".concat(inner, ")")];
  return steps.join('.');
};

exports.out_Text = out_Text;

var in_ = function in_() {
  for (var _len3 = arguments.length, labels = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    labels[_key3] = arguments[_key3];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.inV === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return {
            t: t,
            e: e
          };
        });
      }) // find inbound edges
      .flatMap(function (pair) {
        return context.graph.vertices.filter(function (v) {
          return v.id === pair.e.outV;
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

var in_Text = function in_Text() {
  for (var _len4 = arguments.length, labels = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    labels[_key4] = arguments[_key4];
  }

  var inner = labels ? labels.map(function (l) {
    return "'".concat(l, "'");
  }).join(', ') : '';
  var steps = ["in(".concat(inner, ")")];
  return steps.join('.');
};

exports.in_Text = in_Text;

var both = function both() {
  for (var _len5 = arguments.length, labels = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    labels[_key5] = arguments[_key5];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var sin = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.outV === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return {
            t: t,
            e: e
          };
        });
      }) // find outbound edges
      .flatMap(function (pair) {
        return context.graph.vertices.filter(function (v) {
          return v.id === pair.e.inV;
        }).map(function (v) {
          return (0, _traverser.updateTraverser)(pair.t, v, args);
        });
      }); // find 'to' vertex

      var sout = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.inV === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return {
            t: t,
            e: e
          };
        });
      }) // find inbound edges
      .flatMap(function (pair) {
        return context.graph.vertices.filter(function (v) {
          return v.id === pair.e.outV;
        }).map(function (v) {
          return (0, _traverser.updateTraverser)(pair.t, v, args);
        });
      }); // find 'to' vertex

      return (0, _traverser.updateContext)(context, [].concat(_toConsumableArray(sin), _toConsumableArray(sout)));
    };
  };
};

exports.both = both;

var both_Text = function both_Text() {
  for (var _len6 = arguments.length, labels = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    labels[_key6] = arguments[_key6];
  }

  var inner = labels ? labels.map(function (l) {
    return "'".concat(l, "'");
  }).join(', ') : '';
  var steps = ["both(".concat(inner, ")")];
  return steps.join('.');
};

exports.both_Text = both_Text;

var outE = function outE() {
  for (var _len7 = arguments.length, labels = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    labels[_key7] = arguments[_key7];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.outV === t.current.id && labelMatch(labels, e);
        }).map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find outbound edges

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.outE = outE;

var outE_Text = function outE_Text() {
  for (var _len8 = arguments.length, labels = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    labels[_key8] = arguments[_key8];
  }

  var inner = labels ? labels.map(function (l) {
    return "'".concat(l, "'");
  }).join(', ') : '';
  var steps = ["outE(".concat(inner, ")")];
  return steps.join('.');
};

exports.outE_Text = outE_Text;

var inE = function inE() {
  for (var _len9 = arguments.length, labels = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    labels[_key9] = arguments[_key9];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return e.inV === t.current.id && labelMatch(labels, e);
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

var inE_Text = function inE_Text() {
  for (var _len10 = arguments.length, labels = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    labels[_key10] = arguments[_key10];
  }

  var inner = labels ? labels.map(function (l) {
    return "'".concat(l, "'");
  }).join(', ') : '';
  var steps = ["inE(".concat(inner, ")")];
  return steps.join('.');
};

exports.inE_Text = inE_Text;

var bothE = function bothE() {
  for (var _len11 = arguments.length, labels = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    labels[_key11] = arguments[_key11];
  }

  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isV)(t.current);
      }).flatMap(function (t) {
        return context.graph.edges.filter(function (e) {
          return (e.outV === t.current.id || e.inV === t.current.id) && labelMatch(labels, e);
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

var bothE_Text = function bothE_Text() {
  for (var _len12 = arguments.length, labels = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    labels[_key12] = arguments[_key12];
  }

  var inner = labels ? labels.map(function (l) {
    return "'".concat(l, "'");
  }).join(', ') : '';
  var steps = ["bothE(".concat(inner, ")")];
  return steps.join('.');
};

exports.bothE_Text = bothE_Text;

var outV = function outV() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isE)(t.current);
      }).flatMap(function (t) {
        return context.graph.vertices.filter(function (v) {
          return t.current.outV === v.id;
        }).map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find outbound vertices

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.outV = outV;

var outV_Text = function outV_Text() {
  var steps = ["outV()"];
  return steps.join('.');
};

exports.outV_Text = outV_Text;

var inV = function inV() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isE)(t.current);
      }).flatMap(function (t) {
        return context.graph.vertices.filter(function (v) {
          return t.current.inV === v.id;
        }).map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find inbound vertices

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.inV = inV;

var inV_Text = function inV_Text() {
  var steps = ["inV()"];
  return steps.join('.');
};

exports.inV_Text = inV_Text;

var bothV = function bothV() {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      var next = context.traversers.filter(function (t) {
        return (0, _traverser.isE)(t.current);
      }).flatMap(function (t) {
        return context.graph.vertices.filter(function (v) {
          return t.current.outV === v.id || t.current.inV === v.id;
        }).map(function (e) {
          return (0, _traverser.updateTraverser)(t, e, args);
        });
      }); // find both vertices

      return (0, _traverser.updateContext)(context, next);
    };
  };
};

exports.bothV = bothV;

var bothV_Text = function bothV_Text() {
  var steps = ["bothV()"];
  return steps.join('.');
};

exports.bothV_Text = bothV_Text;
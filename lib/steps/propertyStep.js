"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property_Text = exports.property = void 0;

var _traverser = require("../traverser");

var _sanitiseVal = _interopRequireDefault(require("../utils/sanitiseVal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var property = function property(name, value) {
  return function (getCurrentContext) {
    return function (args) {
      var context = getCurrentContext(args);
      context.traversers.forEach(function (t) {
        if (t.current && t.current.label && !t.current.outV) {
          // is a vertex
          if (!t.current.props) t.current.props = {};
          t.current.props[name] = value;
        } else if (t.current && t.current.label && t.current.outV) {
          // is an edge
          if (!t.current.props) t.current.props = {};
          t.current.props[name] = value;
        } else // TODO: should support dropping properties too
          console.log('drop other');
      });
      return context;
    };
  };
};

exports.property = property;

var property_Text = function property_Text(name, value) {
  var steps = ["property('".concat(name, "', ").concat((0, _sanitiseVal.default)(value), ")")];
  return steps.join('.');
};

exports.property_Text = property_Text;
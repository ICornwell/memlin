"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.subtract = subtract;

var _sub = _interopRequireDefault(require("./sub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  (0, _sub.default)(x, y);
}
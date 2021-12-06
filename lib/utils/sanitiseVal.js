"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function sanitiseVal(val) {
  var isNumberOrBoolean = typeof val === 'number' || typeof val === 'boolean';
  if (typeof val === 'string') return "'".concat(val.replace(/[\\]/g, "\\\\'").replace(/[']/g, "\\'"), "'");else return isNumberOrBoolean ? val : "'".concat(val, "'");
}

var _default = sanitiseVal;
exports.default = _default;
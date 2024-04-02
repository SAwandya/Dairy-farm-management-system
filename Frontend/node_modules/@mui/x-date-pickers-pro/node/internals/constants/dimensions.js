"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DAY_MARGIN", {
  enumerable: true,
  get: function () {
    return _internals.DAY_MARGIN;
  }
});
exports.RANGE_VIEW_HEIGHT = exports.DAY_RANGE_SIZE = void 0;
var _internals = require("@mui/x-date-pickers/internals");
const DAY_RANGE_SIZE = exports.DAY_RANGE_SIZE = 40;
// adding the extra height of the range day element height difference (40px vs 36px)
const RANGE_VIEW_HEIGHT = exports.RANGE_VIEW_HEIGHT = _internals.VIEW_HEIGHT + 6 * 2 * _internals.DAY_MARGIN;
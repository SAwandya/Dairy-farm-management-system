"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateTimeRange = void 0;
var _internals = require("@mui/x-date-pickers/internals");
var _dateUtils = require("../date-utils");
const validateTimeRange = ({
  props,
  value,
  adapter
}) => {
  const [start, end] = value;
  const dateTimeValidations = [(0, _internals.validateTime)({
    adapter,
    value: start,
    props
  }), (0, _internals.validateTime)({
    adapter,
    value: end,
    props
  })];
  if (dateTimeValidations[0] || dateTimeValidations[1]) {
    return dateTimeValidations;
  }

  // for partial input
  if (start === null || end === null) {
    return [null, null];
  }
  if (!(0, _dateUtils.isRangeValid)(adapter.utils, value)) {
    return ['invalidRange', 'invalidRange'];
  }
  return [null, null];
};
exports.validateTimeRange = validateTimeRange;
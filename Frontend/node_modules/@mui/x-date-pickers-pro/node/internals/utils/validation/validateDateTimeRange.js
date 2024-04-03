"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDateTimeRange = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _internals = require("@mui/x-date-pickers/internals");
var _dateUtils = require("../date-utils");
const _excluded = ["shouldDisableDate"];
const validateDateTimeRange = ({
  props,
  value,
  adapter
}) => {
  const [start, end] = value;
  const {
      shouldDisableDate
    } = props,
    otherProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const dateTimeValidations = [(0, _internals.validateDateTime)({
    adapter,
    value: start,
    props: (0, _extends2.default)({}, otherProps, {
      shouldDisableDate: day => !!shouldDisableDate?.(day, 'start')
    })
  }), (0, _internals.validateDateTime)({
    adapter,
    value: end,
    props: (0, _extends2.default)({}, otherProps, {
      shouldDisableDate: day => !!shouldDisableDate?.(day, 'end')
    })
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
exports.validateDateTimeRange = validateDateTimeRange;
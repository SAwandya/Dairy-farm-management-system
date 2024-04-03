"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDateRange = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _internals = require("@mui/x-date-pickers/internals");
var _dateUtils = require("../date-utils");
const _excluded = ["shouldDisableDate"];
const validateDateRange = ({
  props,
  value,
  adapter
}) => {
  const [start, end] = value;
  const {
      shouldDisableDate
    } = props,
    otherProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const dateValidations = [(0, _internals.validateDate)({
    adapter,
    value: start,
    props: (0, _extends2.default)({}, otherProps, {
      shouldDisableDate: day => !!shouldDisableDate?.(day, 'start')
    })
  }), (0, _internals.validateDate)({
    adapter,
    value: end,
    props: (0, _extends2.default)({}, otherProps, {
      shouldDisableDate: day => !!shouldDisableDate?.(day, 'end')
    })
  })];
  if (dateValidations[0] || dateValidations[1]) {
    return dateValidations;
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
exports.validateDateRange = validateDateRange;
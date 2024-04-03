"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeRangePickerTimeWrapper = DateTimeRangePickerTimeWrapper;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _internals = require("@mui/x-date-pickers/internals");
var _dateUtils = require("../internals/utils/date-utils");
var _dateRangeManager = require("../internals/utils/date-range-manager");
const _excluded = ["rangePosition", "onRangePositionChange", "viewRenderer", "value", "onChange", "defaultValue", "onViewChange", "views", "className"];
/**
 * @ignore - internal component.
 */
function DateTimeRangePickerTimeWrapper(props, ref) {
  const utils = (0, _internals.useUtils)();
  const {
      rangePosition,
      onRangePositionChange,
      viewRenderer,
      value,
      onChange,
      defaultValue,
      onViewChange,
      views
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  if (!viewRenderer) {
    return null;
  }
  const currentValue = (rangePosition === 'start' ? value?.[0] : value?.[1]) ?? null;
  const currentDefaultValue = (rangePosition === 'start' ? defaultValue?.[0] : defaultValue?.[1]) ?? null;
  const handleOnChange = (newDate, selectionState, selectedView) => {
    if (!onChange || !value) {
      return;
    }
    const {
      newRange
    } = (0, _dateRangeManager.calculateRangeChange)({
      newDate,
      utils,
      range: value,
      rangePosition
    });
    const isFullRangeSelected = rangePosition === 'end' && (0, _dateUtils.isRangeValid)(utils, newRange);
    const timeViews = views.filter(_internals.isInternalTimeView);
    // reset view to the first time view and swap range position after selecting the last time view (start or end position)
    if (selectedView === timeViews[timeViews.length - 1] && onViewChange) {
      onViewChange(views[0]);
      onRangePositionChange(rangePosition === 'start' ? 'end' : 'start');
    }
    onChange(newRange, isFullRangeSelected ? 'finish' : 'partial', selectedView);
  };
  return viewRenderer((0, _extends2.default)({}, other, {
    ref,
    views,
    onViewChange,
    value: currentValue,
    onChange: handleOnChange,
    defaultValue: currentDefaultValue
  }));
}
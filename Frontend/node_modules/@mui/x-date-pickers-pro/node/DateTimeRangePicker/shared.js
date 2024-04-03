"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDateTimeRangePickerDefaultizedProps = useDateTimeRangePickerDefaultizedProps;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _styles = require("@mui/material/styles");
var _internals = require("@mui/x-date-pickers/internals");
var _DateTimeRangePickerToolbar = require("./DateTimeRangePickerToolbar");
var _DateTimeRangePickerTabs = require("./DateTimeRangePickerTabs");
function useDateTimeRangePickerDefaultizedProps(props, name) {
  const utils = (0, _internals.useUtils)();
  const defaultDates = (0, _internals.useDefaultDates)();
  const themeProps = (0, _styles.useThemeProps)({
    props,
    name
  });
  const ampm = themeProps.ampm ?? utils.is12HourCycleInCurrentLocale();
  const {
    openTo,
    views: defaultViews
  } = (0, _internals.applyDefaultViewProps)({
    views: themeProps.views,
    openTo: themeProps.openTo,
    defaultViews: ['day', 'hours', 'minutes'],
    defaultOpenTo: 'day'
  });
  const {
    shouldRenderTimeInASingleColumn,
    thresholdToRenderTimeInASingleColumn,
    views,
    timeSteps
  } = (0, _internals.resolveTimeViewsResponse)({
    thresholdToRenderTimeInASingleColumn: themeProps.thresholdToRenderTimeInASingleColumn,
    ampm,
    timeSteps: themeProps.timeSteps,
    views: defaultViews
  });
  return (0, _extends2.default)({}, themeProps, {
    timeSteps,
    openTo,
    shouldRenderTimeInASingleColumn,
    thresholdToRenderTimeInASingleColumn,
    views,
    ampm,
    disableFuture: themeProps.disableFuture ?? false,
    disablePast: themeProps.disablePast ?? false,
    minDate: (0, _internals.applyDefaultDate)(utils, themeProps.minDateTime ?? themeProps.minDate, defaultDates.minDate),
    maxDate: (0, _internals.applyDefaultDate)(utils, themeProps.maxDateTime ?? themeProps.maxDate, defaultDates.maxDate),
    minTime: themeProps.minDateTime ?? themeProps.minTime,
    maxTime: themeProps.maxDateTime ?? themeProps.maxTime,
    disableIgnoringDatePartForTimeValidation: themeProps.disableIgnoringDatePartForTimeValidation ?? Boolean(themeProps.minDateTime || themeProps.maxDateTime ||
    // allow digital clocks to correctly check time validity: https://github.com/mui/mui-x/issues/12048
    themeProps.disablePast || themeProps.disableFuture),
    slots: (0, _extends2.default)({
      tabs: _DateTimeRangePickerTabs.DateTimeRangePickerTabs,
      toolbar: _DateTimeRangePickerToolbar.DateTimeRangePickerToolbar
    }, themeProps.slots),
    slotProps: (0, _extends2.default)({}, themeProps.slotProps, {
      toolbar: (0, _extends2.default)({}, themeProps.slotProps?.toolbar, {
        ampm
      })
    })
  });
}
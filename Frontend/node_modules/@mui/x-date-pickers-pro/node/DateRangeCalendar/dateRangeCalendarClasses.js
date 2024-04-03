"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateRangeCalendarUtilityClass = exports.dateRangeCalendarClasses = void 0;
var _utils = require("@mui/utils");
const getDateRangeCalendarUtilityClass = slot => (0, _utils.unstable_generateUtilityClass)('MuiDateRangeCalendar', slot);
exports.getDateRangeCalendarUtilityClass = getDateRangeCalendarUtilityClass;
const dateRangeCalendarClasses = exports.dateRangeCalendarClasses = (0, _utils.unstable_generateUtilityClasses)('MuiDateRangeCalendar', ['root', 'monthContainer', 'dayDragging']);
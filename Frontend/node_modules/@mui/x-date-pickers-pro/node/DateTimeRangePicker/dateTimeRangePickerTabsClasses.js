"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateTimeRangePickerTabsClasses = void 0;
exports.getDateTimeRangePickerTabsUtilityClass = getDateTimeRangePickerTabsUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getDateTimeRangePickerTabsUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiDateTimeRangePickerTabs', slot);
}
const dateTimeRangePickerTabsClasses = exports.dateTimeRangePickerTabsClasses = (0, _generateUtilityClasses.default)('MuiDateTimeRangePickerTabs', ['root', 'tabButton', 'navigationButton', 'filler']);
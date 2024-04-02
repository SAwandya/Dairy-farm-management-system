"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rangeValueManager = exports.getRangeFieldValueManager = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _internals = require("@mui/x-date-pickers/internals");
var _dateFieldsUtils = require("./date-fields-utils");
const _excluded = ["value", "referenceDate"];
const rangeValueManager = exports.rangeValueManager = {
  emptyValue: [null, null],
  getTodayValue: (utils, timezone, valueType) => [(0, _internals.getTodayDate)(utils, timezone, valueType), (0, _internals.getTodayDate)(utils, timezone, valueType)],
  getInitialReferenceValue: _ref => {
    let {
        value,
        referenceDate: referenceDateProp
      } = _ref,
      params = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
    const shouldKeepStartDate = value[0] != null && params.utils.isValid(value[0]);
    const shouldKeepEndDate = value[1] != null && params.utils.isValid(value[1]);
    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }
    const referenceDate = referenceDateProp ?? (0, _internals.getDefaultReferenceDate)(params);
    return [shouldKeepStartDate ? value[0] : referenceDate, shouldKeepEndDate ? value[1] : referenceDate];
  },
  cleanValue: (utils, value) => value.map(date => (0, _internals.replaceInvalidDateByNull)(utils, date)),
  areValuesEqual: (utils, a, b) => (0, _internals.areDatesEqual)(utils, a[0], b[0]) && (0, _internals.areDatesEqual)(utils, a[1], b[1]),
  isSameError: (a, b) => b !== null && a[1] === b[1] && a[0] === b[0],
  hasError: error => error[0] != null || error[1] != null,
  defaultErrorState: [null, null],
  getTimezone: (utils, value) => {
    const timezoneStart = value[0] == null || !utils.isValid(value[0]) ? null : utils.getTimezone(value[0]);
    const timezoneEnd = value[1] == null || !utils.isValid(value[1]) ? null : utils.getTimezone(value[1]);
    if (timezoneStart != null && timezoneEnd != null && timezoneStart !== timezoneEnd) {
      throw new Error('MUI X: The timezone of the start and the end date should be the same.');
    }
    return timezoneStart ?? timezoneEnd;
  },
  setTimezone: (utils, timezone, value) => [value[0] == null ? null : utils.setTimezone(value[0], timezone), value[1] == null ? null : utils.setTimezone(value[1], timezone)]
};
const getRangeFieldValueManager = ({
  dateSeparator = '–'
}) => ({
  updateReferenceValue: (utils, value, prevReferenceValue) => {
    const shouldKeepStartDate = value[0] != null && utils.isValid(value[0]);
    const shouldKeepEndDate = value[1] != null && utils.isValid(value[1]);
    if (!shouldKeepStartDate && !shouldKeepEndDate) {
      return prevReferenceValue;
    }
    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }
    if (shouldKeepStartDate) {
      return [value[0], prevReferenceValue[0]];
    }
    return [prevReferenceValue[1], value[1]];
  },
  getSectionsFromValue: (utils, [start, end], fallbackSections, getSectionsFromDate) => {
    const separatedFallbackSections = fallbackSections == null ? {
      startDate: null,
      endDate: null
    } : (0, _dateFieldsUtils.splitDateRangeSections)(fallbackSections);
    const getSections = (newDate, fallbackDateSections, position) => {
      const shouldReUsePrevDateSections = !utils.isValid(newDate) && !!fallbackDateSections;
      if (shouldReUsePrevDateSections) {
        return fallbackDateSections;
      }
      const sections = getSectionsFromDate(newDate);
      return sections.map((section, sectionIndex) => {
        if (sectionIndex === sections.length - 1 && position === 'start') {
          return (0, _extends2.default)({}, section, {
            dateName: position,
            // TODO: Check if RTL still works
            endSeparator: `${section.endSeparator} ${dateSeparator} `
          });
        }
        return (0, _extends2.default)({}, section, {
          dateName: position
        });
      });
    };
    return [...getSections(start, separatedFallbackSections.startDate, 'start'), ...getSections(end, separatedFallbackSections.endDate, 'end')];
  },
  getV7HiddenInputValueFromSections: sections => {
    const dateRangeSections = (0, _dateFieldsUtils.splitDateRangeSections)(sections);
    return (0, _internals.createDateStrForV7HiddenInputFromSections)([...dateRangeSections.startDate, ...dateRangeSections.endDate]);
  },
  getV6InputValueFromSections: (sections, localizedDigits, isRTL) => {
    const dateRangeSections = (0, _dateFieldsUtils.splitDateRangeSections)(sections);
    return (0, _internals.createDateStrForV6InputFromSections)([...dateRangeSections.startDate, ...dateRangeSections.endDate], localizedDigits, isRTL);
  },
  parseValueStr: (valueStr, referenceValue, parseDate) => {
    // TODO: Improve because it would not work if some section have the same separator as the dateSeparator.
    const [startStr, endStr] = valueStr.split(dateSeparator);
    return [startStr, endStr].map((dateStr, index) => {
      if (dateStr == null) {
        return null;
      }
      return parseDate(dateStr.trim(), referenceValue[index]);
    });
  },
  getActiveDateManager: (utils, state, activeSection) => {
    const index = activeSection.dateName === 'start' ? 0 : 1;
    const updateDateInRange = (newDate, prevDateRange) => index === 0 ? [newDate, prevDateRange[1]] : [prevDateRange[0], newDate];
    return {
      date: state.value[index],
      referenceDate: state.referenceValue[index],
      getSections: sections => {
        const dateRangeSections = (0, _dateFieldsUtils.splitDateRangeSections)(sections);
        if (index === 0) {
          return (0, _dateFieldsUtils.removeLastSeparator)(dateRangeSections.startDate);
        }
        return dateRangeSections.endDate;
      },
      getNewValuesFromNewActiveDate: newActiveDate => ({
        value: updateDateInRange(newActiveDate, state.value),
        referenceValue: newActiveDate == null || !utils.isValid(newActiveDate) ? state.referenceValue : updateDateInRange(newActiveDate, state.referenceValue)
      })
    };
  }
});
exports.getRangeFieldValueManager = getRangeFieldValueManager;
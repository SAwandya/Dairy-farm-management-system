"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitDateRangeSections = exports.removeLastSeparator = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
const splitDateRangeSections = sections => {
  const startDateSections = [];
  const endDateSections = [];
  sections.forEach(section => {
    if (section.dateName === 'start') {
      startDateSections.push(section);
    } else {
      endDateSections.push(section);
    }
  });
  return {
    startDate: startDateSections,
    endDate: endDateSections
  };
};
exports.splitDateRangeSections = splitDateRangeSections;
const removeLastSeparator = dateSections => dateSections.map((section, sectionIndex) => {
  if (sectionIndex === dateSections.length - 1) {
    return (0, _extends2.default)({}, section, {
      separator: null
    });
  }
  return section;
});
exports.removeLastSeparator = removeLastSeparator;
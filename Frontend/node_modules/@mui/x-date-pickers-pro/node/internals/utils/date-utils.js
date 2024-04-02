"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWithinRange = exports.isStartOfRange = exports.isRangeValid = exports.isEndOfRange = void 0;
const isRangeValid = (utils, range) => {
  return Boolean(range && range[0] && range[1] && !utils.isBefore(range[1], range[0]));
};
exports.isRangeValid = isRangeValid;
const isWithinRange = (utils, day, range) => {
  return isRangeValid(utils, range) && utils.isWithinRange(day, range);
};
exports.isWithinRange = isWithinRange;
const isStartOfRange = (utils, day, range) => {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[0]);
};
exports.isStartOfRange = isStartOfRange;
const isEndOfRange = (utils, day, range) => {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[1]);
};
exports.isEndOfRange = isEndOfRange;
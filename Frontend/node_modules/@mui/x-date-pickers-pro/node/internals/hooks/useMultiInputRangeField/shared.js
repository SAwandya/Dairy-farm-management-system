"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excludeProps = void 0;
/* TODO: remove this when a clearable behavior for multiple input range fields is implemented */
const excludeProps = (props, excludedProps) => {
  return Object.keys(props).reduce((acc, key) => {
    if (!excludedProps.includes(key)) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
};
exports.excludeProps = excludeProps;
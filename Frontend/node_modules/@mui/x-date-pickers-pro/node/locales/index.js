"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _locales = require("@mui/x-date-pickers/locales");
Object.keys(_locales).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _locales[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _locales[key];
    }
  });
});
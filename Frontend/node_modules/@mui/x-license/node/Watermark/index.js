"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Watermark = require("./Watermark");
Object.keys(_Watermark).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Watermark[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Watermark[key];
    }
  });
});
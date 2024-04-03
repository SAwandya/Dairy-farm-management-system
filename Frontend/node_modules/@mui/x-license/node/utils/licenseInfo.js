"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicenseInfo = void 0;
var _utils = require("@mui/utils");
/**
 * @ignore - do not document.
 */

// Store the license information in a global, so it can be shared
// when module duplication occurs. The duplication of the modules can happen
// if using multiple version of MUI X at the same time of the bundler
// decide to duplicate to improve the size of the chunks.
// eslint-disable-next-line no-underscore-dangle
_utils.ponyfillGlobal.__MUI_LICENSE_INFO__ = _utils.ponyfillGlobal.__MUI_LICENSE_INFO__ || {
  key: undefined
};
class LicenseInfo {
  static getLicenseInfo() {
    // eslint-disable-next-line no-underscore-dangle
    return _utils.ponyfillGlobal.__MUI_LICENSE_INFO__;
  }
  static getLicenseKey() {
    return LicenseInfo.getLicenseInfo().key;
  }
  static setLicenseKey(key) {
    const licenseInfo = LicenseInfo.getLicenseInfo();
    licenseInfo.key = key;
  }
}
exports.LicenseInfo = LicenseInfo;
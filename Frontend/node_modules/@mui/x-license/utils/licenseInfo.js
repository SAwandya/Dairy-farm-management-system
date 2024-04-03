import { ponyfillGlobal } from '@mui/utils';

/**
 * @ignore - do not document.
 */

// Store the license information in a global, so it can be shared
// when module duplication occurs. The duplication of the modules can happen
// if using multiple version of MUI X at the same time of the bundler
// decide to duplicate to improve the size of the chunks.
// eslint-disable-next-line no-underscore-dangle
ponyfillGlobal.__MUI_LICENSE_INFO__ = ponyfillGlobal.__MUI_LICENSE_INFO__ || {
  key: undefined
};
export class LicenseInfo {
  static getLicenseInfo() {
    // eslint-disable-next-line no-underscore-dangle
    return ponyfillGlobal.__MUI_LICENSE_INFO__;
  }
  static getLicenseKey() {
    return LicenseInfo.getLicenseInfo().key;
  }
  static setLicenseKey(key) {
    const licenseInfo = LicenseInfo.getLicenseInfo();
    licenseInfo.key = key;
  }
}
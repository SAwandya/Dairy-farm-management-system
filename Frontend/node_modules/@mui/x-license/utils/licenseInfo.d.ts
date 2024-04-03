/**
 * @ignore - do not document.
 */
export interface MuiLicenseInfo {
    key: string | undefined;
}
export declare class LicenseInfo {
    private static getLicenseInfo;
    static getLicenseKey(): MuiLicenseInfo['key'];
    static setLicenseKey(key: string): void;
}

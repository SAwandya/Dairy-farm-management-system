import * as React from 'react';
import { MuiLicenseInfo } from '../utils/licenseInfo';
/**
 * @ignore - do not document.
 */
export interface LicenseInfoProviderProps {
    info: MuiLicenseInfo;
    children?: React.ReactNode;
}
/**
 * @ignore - do not document.
 */
export declare function LicenseInfoProvider({ info, children }: LicenseInfoProviderProps): React.JSX.Element;

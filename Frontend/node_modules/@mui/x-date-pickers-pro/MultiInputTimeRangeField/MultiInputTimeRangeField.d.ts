import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { MultiInputTimeRangeFieldProps } from './MultiInputTimeRangeField.types';
import { MultiInputRangeFieldClasses } from '../models';
export declare const multiInputTimeRangeFieldClasses: MultiInputRangeFieldClasses;
export declare const getMultiInputTimeRangeFieldUtilityClass: (slot: string) => string;
type MultiInputTimeRangeFieldComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: MultiInputTimeRangeFieldProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [TimeRangeField](http://mui.com/x/react-date-pickers/time-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [MultiInputTimeRangeField API](https://mui.com/x/api/multi-input-time-range-field/)
 */
declare const MultiInputTimeRangeField: MultiInputTimeRangeFieldComponent;
export { MultiInputTimeRangeField };

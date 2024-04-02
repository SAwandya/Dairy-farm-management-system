import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { MultiInputDateTimeRangeFieldProps } from './MultiInputDateTimeRangeField.types';
import { MultiInputRangeFieldClasses } from '../models';
export declare const multiInputDateTimeRangeFieldClasses: MultiInputRangeFieldClasses;
export declare const getMultiInputDateTimeRangeFieldUtilityClass: (slot: string) => string;
type MultiInputDateTimeRangeFieldComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: MultiInputDateTimeRangeFieldProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateTimeRangeField](http://mui.com/x/react-date-pickers/date-time-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [MultiInputDateTimeRangeField API](https://mui.com/x/api/multi-input-date-time-range-field/)
 */
declare const MultiInputDateTimeRangeField: MultiInputDateTimeRangeFieldComponent;
export { MultiInputDateTimeRangeField };

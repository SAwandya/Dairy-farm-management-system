import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { MultiInputDateRangeFieldProps } from './MultiInputDateRangeField.types';
import { MultiInputRangeFieldClasses } from '../models';
export declare const multiInputDateRangeFieldClasses: MultiInputRangeFieldClasses;
export declare const getMultiInputDateRangeFieldUtilityClass: (slot: string) => string;
type MultiInputDateRangeFieldComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: MultiInputDateRangeFieldProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateRangeField](http://mui.com/x/react-date-pickers/date-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [MultiInputDateRangeField API](https://mui.com/x/api/multi-input-date-range-field/)
 */
declare const MultiInputDateRangeField: MultiInputDateRangeFieldComponent;
export { MultiInputDateRangeField };

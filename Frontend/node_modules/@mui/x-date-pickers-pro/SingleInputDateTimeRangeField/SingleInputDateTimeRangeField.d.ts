import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { SingleInputDateTimeRangeFieldProps } from './SingleInputDateTimeRangeField.types';
import { FieldType } from '../models';
type DateRangeFieldComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: SingleInputDateTimeRangeFieldProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
    fieldType?: FieldType;
};
/**
 * Demos:
 *
 * - [DateTimeRangeField](http://mui.com/x/react-date-pickers/date-time-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [SingleInputDateTimeRangeField API](https://mui.com/x/api/single-input-date-time-range-field/)
 */
declare const SingleInputDateTimeRangeField: DateRangeFieldComponent;
export { SingleInputDateTimeRangeField };

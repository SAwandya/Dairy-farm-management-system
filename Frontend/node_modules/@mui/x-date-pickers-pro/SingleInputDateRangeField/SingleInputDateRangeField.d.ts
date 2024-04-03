import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { SingleInputDateRangeFieldProps } from './SingleInputDateRangeField.types';
import { FieldType } from '../models';
type DateRangeFieldComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: SingleInputDateRangeFieldProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
    fieldType?: FieldType;
};
/**
 * Demos:
 *
 * - [DateRangeField](http://mui.com/x/react-date-pickers/date-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [SingleInputDateRangeField API](https://mui.com/x/api/single-input-date-range-field/)
 */
declare const SingleInputDateRangeField: DateRangeFieldComponent;
export { SingleInputDateRangeField };

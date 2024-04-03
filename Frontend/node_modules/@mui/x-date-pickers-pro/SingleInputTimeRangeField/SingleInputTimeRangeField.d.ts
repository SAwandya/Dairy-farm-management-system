import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { SingleInputTimeRangeFieldProps } from './SingleInputTimeRangeField.types';
import { FieldType } from '../models';
type DateRangeFieldComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: SingleInputTimeRangeFieldProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
    fieldType?: FieldType;
};
/**
 * Demos:
 *
 * - [TimeRangeField](http://mui.com/x/react-date-pickers/time-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [SingleInputTimeRangeField API](https://mui.com/x/api/single-input-time-range-field/)
 */
declare const SingleInputTimeRangeField: DateRangeFieldComponent;
export { SingleInputTimeRangeField };

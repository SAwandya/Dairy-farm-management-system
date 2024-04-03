import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DateTimeRangePickerProps } from './DateTimeRangePicker.types';
type DateTimeRangePickerComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: DateTimeRangePickerProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateTimeRangePicker](https://mui.com/x/react-date-pickers/date-time-range-picker/)
 * - [Validation](https://mui.com/x/react-date-pickers/validation/)
 *
 * API:
 *
 * - [DateTimeRangePicker API](https://mui.com/x/api/date-pickers/date-time-range-picker/)
 */
declare const DateTimeRangePicker: DateTimeRangePickerComponent;
export { DateTimeRangePicker };

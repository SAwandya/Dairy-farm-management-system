import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DateRangePickerProps } from './DateRangePicker.types';
type DatePickerComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: DateRangePickerProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 * - [Validation](https://mui.com/x/react-date-pickers/validation/)
 *
 * API:
 *
 * - [DateRangePicker API](https://mui.com/x/api/date-pickers/date-range-picker/)
 */
declare const DateRangePicker: DatePickerComponent;
export { DateRangePicker };

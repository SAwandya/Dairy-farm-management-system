import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { StaticDateRangePickerProps } from './StaticDateRangePicker.types';
type StaticDateRangePickerComponent = (<TDate extends PickerValidDate>(props: StaticDateRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
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
 * - [StaticDateRangePicker API](https://mui.com/x/api/date-pickers/static-date-range-picker/)
 */
declare const StaticDateRangePicker: StaticDateRangePickerComponent;
export { StaticDateRangePicker };

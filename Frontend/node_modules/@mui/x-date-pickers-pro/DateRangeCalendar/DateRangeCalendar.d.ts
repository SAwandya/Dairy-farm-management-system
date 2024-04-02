import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DateRangeCalendarProps } from './DateRangeCalendar.types';
type DateRangeCalendarComponent = (<TDate extends PickerValidDate>(props: DateRangeCalendarProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 * - [DateRangeCalendar](https://mui.com/x/react-date-pickers/date-range-calendar/)
 *
 * API:
 *
 * - [DateRangeCalendar API](https://mui.com/x/api/date-pickers/date-range-calendar/)
 */
declare const DateRangeCalendar: DateRangeCalendarComponent;
export { DateRangeCalendar };

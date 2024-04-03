import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DesktopDateTimeRangePickerProps } from './DesktopDateTimeRangePicker.types';
type DesktopDateRangePickerComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: DesktopDateTimeRangePickerProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
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
 * - [DesktopDateTimeRangePicker API](https://mui.com/x/api/date-pickers/desktop-date-time-range-picker/)
 */
declare const DesktopDateTimeRangePicker: DesktopDateRangePickerComponent;
export { DesktopDateTimeRangePicker };

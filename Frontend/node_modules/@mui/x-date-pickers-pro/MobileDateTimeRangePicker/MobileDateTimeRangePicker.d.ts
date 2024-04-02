import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { MobileDateTimeRangePickerProps } from './MobileDateTimeRangePicker.types';
type MobileDateRangePickerComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: MobileDateTimeRangePickerProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
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
 * - [MobileDateTimeRangePicker API](https://mui.com/x/api/date-pickers/mobile-date-time-range-picker/)
 */
declare const MobileDateTimeRangePicker: MobileDateRangePickerComponent;
export { MobileDateTimeRangePicker };

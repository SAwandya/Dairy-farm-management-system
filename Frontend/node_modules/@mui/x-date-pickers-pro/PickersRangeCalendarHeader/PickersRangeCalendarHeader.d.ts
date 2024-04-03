import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { PickersRangeCalendarHeaderProps } from './PickersRangeCalendarHeader.types';
type PickersRangeCalendarHeaderComponent = (<TDate extends PickerValidDate>(props: PickersRangeCalendarHeaderProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
declare const PickersRangeCalendarHeader: PickersRangeCalendarHeaderComponent;
export { PickersRangeCalendarHeader };

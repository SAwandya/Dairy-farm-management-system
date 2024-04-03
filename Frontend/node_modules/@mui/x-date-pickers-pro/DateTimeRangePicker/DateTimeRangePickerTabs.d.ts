import * as React from 'react';
import { DateOrTimeViewWithMeridiem, BaseTabsProps, ExportedBaseTabsProps } from '@mui/x-date-pickers/internals';
import { DateTimeRangePickerTabsClasses } from './dateTimeRangePickerTabsClasses';
import { UseRangePositionResponse } from '../internals/hooks/useRangePosition';
export interface ExportedDateTimeRangePickerTabsProps extends ExportedBaseTabsProps {
    /**
     * Toggles visibility of the tabs allowing view switching.
     * @default `window.innerHeight < 667` for `DesktopDateTimeRangePicker` and `MobileDateTimeRangePicker`
     */
    hidden?: boolean;
    /**
     * Date tab icon.
     * @default DateRangeIcon
     */
    dateIcon?: React.ReactElement;
    /**
     * Time tab icon.
     * @default TimeIcon
     */
    timeIcon?: React.ReactElement;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DateTimeRangePickerTabsClasses>;
}
export interface DateTimeRangePickerTabsProps extends ExportedDateTimeRangePickerTabsProps, BaseTabsProps<DateOrTimeViewWithMeridiem>, Pick<UseRangePositionResponse, 'rangePosition' | 'onRangePositionChange'> {
}
declare const DateTimeRangePickerTabs: {
    (inProps: DateTimeRangePickerTabsProps): React.JSX.Element | null;
    propTypes: any;
};
export { DateTimeRangePickerTabs };

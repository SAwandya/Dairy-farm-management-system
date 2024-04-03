import * as React from 'react';
import { BaseToolbarProps, ExportedBaseToolbarProps } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DateRange } from '../models';
import { UseRangePositionResponse } from '../internals/hooks/useRangePosition';
import { DateRangePickerToolbarClasses } from './dateRangePickerToolbarClasses';
export interface DateRangePickerToolbarProps<TDate extends PickerValidDate> extends ExportedDateRangePickerToolbarProps, Omit<BaseToolbarProps<DateRange<TDate>, 'day'>, 'onChange' | 'isLandscape'>, Pick<UseRangePositionResponse, 'rangePosition' | 'onRangePositionChange'> {
}
export interface ExportedDateRangePickerToolbarProps extends ExportedBaseToolbarProps {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DateRangePickerToolbarClasses>;
}
/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 * - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [DateRangePickerToolbar API](https://mui.com/x/api/date-pickers/date-range-picker-toolbar/)
 */
declare const DateRangePickerToolbar: React.ForwardRefExoticComponent<DateRangePickerToolbarProps<PickerValidDate> & React.RefAttributes<HTMLDivElement>>;
export { DateRangePickerToolbar };

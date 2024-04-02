import * as React from 'react';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateRangePickerDayClasses } from './dateRangePickerDayClasses';
export interface DateRangePickerDayProps<TDate extends PickerValidDate> extends Omit<PickersDayProps<TDate>, 'classes' | 'onBlur' | 'onFocus' | 'onKeyDown'> {
    /**
     * Set to `true` if the `day` is in a highlighted date range.
     */
    isHighlighting: boolean;
    /**
     * Set to `true` if the `day` is the end of a highlighted date range.
     */
    isEndOfHighlighting: boolean;
    /**
     * Set to `true` if the `day` is the start of a highlighted date range.
     */
    isStartOfHighlighting: boolean;
    /**
     * Set to `true` if the `day` is in a preview date range.
     */
    isPreviewing: boolean;
    /**
     * Set to `true` if the `day` is the end of a previewing date range.
     */
    isEndOfPreviewing: boolean;
    /**
     * Set to `true` if the `day` is the start of a previewing date range.
     */
    isStartOfPreviewing: boolean;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DateRangePickerDayClasses>;
    /**
     * Indicates if the day should be visually selected.
     */
    isVisuallySelected?: boolean;
    /**
     * If `true`, the day can be dragged to change the current date range.
     * @default false
     */
    draggable?: boolean;
}
type DateRangePickerDayComponent = <TDate extends PickerValidDate>(props: DateRangePickerDayProps<TDate> & React.RefAttributes<HTMLButtonElement>) => React.JSX.Element;
/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 *
 * API:
 *
 * - [DateRangePickerDay API](https://mui.com/x/api/date-pickers/date-range-picker-day/)
 */
export declare const DateRangePickerDay: DateRangePickerDayComponent;
export {};

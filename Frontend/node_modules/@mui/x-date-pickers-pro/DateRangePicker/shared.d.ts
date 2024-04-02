import * as React from 'react';
import { LocalizedComponent } from '@mui/x-date-pickers/locales';
import { DefaultizedProps, BaseDateValidationProps, BasePickerInputProps, PickerViewRendererLookup } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DateRangeValidationError, DateRange } from '../models';
import { DateRangeCalendarSlots, DateRangeCalendarSlotProps, ExportedDateRangeCalendarProps } from '../DateRangeCalendar';
import { DateRangePickerToolbarProps, ExportedDateRangePickerToolbarProps } from './DateRangePickerToolbar';
import { DateRangeViewRendererProps } from '../dateRangeViewRenderers';
export interface BaseDateRangePickerSlots<TDate extends PickerValidDate> extends DateRangeCalendarSlots<TDate> {
    /**
     * Custom component for the toolbar rendered above the views.
     * @default DateTimePickerToolbar
     */
    toolbar?: React.JSXElementConstructor<DateRangePickerToolbarProps<TDate>>;
}
export interface BaseDateRangePickerSlotProps<TDate extends PickerValidDate> extends DateRangeCalendarSlotProps<TDate> {
    toolbar?: ExportedDateRangePickerToolbarProps;
}
export interface BaseDateRangePickerProps<TDate extends PickerValidDate> extends Omit<BasePickerInputProps<DateRange<TDate>, TDate, 'day', DateRangeValidationError>, 'view' | 'views' | 'openTo' | 'onViewChange' | 'orientation'>, ExportedDateRangeCalendarProps<TDate>, BaseDateValidationProps<TDate> {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: BaseDateRangePickerSlots<TDate>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: BaseDateRangePickerSlotProps<TDate>;
    /**
     * Define custom view renderers for each section.
     * If `null`, the section will only have field editing.
     * If `undefined`, internally defined view will be the used.
     */
    viewRenderers?: Partial<PickerViewRendererLookup<DateRange<TDate>, 'day', DateRangeViewRendererProps<TDate, 'day'>, {}>>;
}
type UseDateRangePickerDefaultizedProps<TDate extends PickerValidDate, Props extends BaseDateRangePickerProps<TDate>> = LocalizedComponent<TDate, DefaultizedProps<Props, keyof BaseDateValidationProps<TDate>>>;
export declare function useDateRangePickerDefaultizedProps<TDate extends PickerValidDate, Props extends BaseDateRangePickerProps<TDate>>(props: Props, name: string): UseDateRangePickerDefaultizedProps<TDate, Props>;
export {};

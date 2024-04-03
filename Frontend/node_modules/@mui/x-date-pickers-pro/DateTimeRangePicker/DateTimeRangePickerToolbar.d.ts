import * as React from 'react';
import { BaseToolbarProps, ExportedBaseToolbarProps, DateOrTimeViewWithMeridiem, WrapperVariant } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DateRange } from '../models';
import { UseRangePositionResponse } from '../internals/hooks/useRangePosition';
import { DateTimeRangePickerToolbarClasses } from './dateTimeRangePickerToolbarClasses';
type DateTimeRangeViews = Exclude<DateOrTimeViewWithMeridiem, 'year' | 'month'>;
export interface DateTimeRangePickerToolbarProps<TDate extends PickerValidDate> extends BaseToolbarProps<DateRange<TDate>, DateTimeRangeViews>, Pick<UseRangePositionResponse, 'rangePosition' | 'onRangePositionChange'>, ExportedDateTimeRangePickerToolbarProps {
    ampm?: boolean;
    toolbarVariant?: WrapperVariant;
}
export interface ExportedDateTimeRangePickerToolbarProps extends ExportedBaseToolbarProps {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DateTimeRangePickerToolbarClasses>;
}
declare const DateTimeRangePickerToolbar: React.ForwardRefExoticComponent<DateTimeRangePickerToolbarProps<PickerValidDate> & React.RefAttributes<HTMLDivElement>>;
export { DateTimeRangePickerToolbar };

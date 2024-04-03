import * as React from 'react';
import { PickerSelectionState, PickerViewRenderer, TimeViewWithMeridiem, BaseClockProps, DefaultizedProps } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { DateRange } from '../models';
import { UseRangePositionResponse } from '../internals/hooks/useRangePosition';
export type DateTimeRangePickerTimeWrapperProps<TDate extends PickerValidDate, TView extends TimeViewWithMeridiem, TComponentProps extends DefaultizedProps<Omit<BaseClockProps<TDate, TView>, 'value' | 'defaultValue' | 'onChange'>, 'views'>> = Pick<UseRangePositionResponse, 'rangePosition' | 'onRangePositionChange'> & Omit<TComponentProps, 'views' | 'view' | 'onViewChange' | 'value' | 'defaultValue' | 'onChange'> & {
    view: TView;
    onViewChange?: (view: TView) => void;
    views: readonly TView[];
    value?: DateRange<TDate>;
    defaultValue?: DateRange<TDate>;
    onChange?: (value: DateRange<TDate>, selectionState: PickerSelectionState, selectedView: TView) => void;
    viewRenderer?: PickerViewRenderer<DateRange<TDate>, TView, TComponentProps, any> | null;
    openTo?: TView;
};
/**
 * @ignore - internal component.
 */
declare function DateTimeRangePickerTimeWrapper<TDate extends PickerValidDate, TView extends TimeViewWithMeridiem, TComponentProps extends DefaultizedProps<Omit<BaseClockProps<TDate, TView>, 'value' | 'defaultValue' | 'onChange'>, 'views'>>(props: DateTimeRangePickerTimeWrapperProps<TDate, TView, TComponentProps>, ref: React.Ref<HTMLDivElement>): React.ReactNode;
export { DateTimeRangePickerTimeWrapper };

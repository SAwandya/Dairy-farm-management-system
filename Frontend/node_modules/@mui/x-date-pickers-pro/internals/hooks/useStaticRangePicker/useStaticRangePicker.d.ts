import * as React from 'react';
import { DateOrTimeViewWithMeridiem } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { UseStaticRangePickerParams, UseStaticRangePickerProps } from './useStaticRangePicker.types';
/**
 * Hook managing all the range static pickers:
 * - StaticDateRangePicker
 */
export declare const useStaticRangePicker: <TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TExternalProps extends UseStaticRangePickerProps<TDate, TView, any, TExternalProps>>({ props, ref, ...pickerParams }: UseStaticRangePickerParams<TDate, TView, TExternalProps>) => {
    renderPicker: () => React.JSX.Element;
};

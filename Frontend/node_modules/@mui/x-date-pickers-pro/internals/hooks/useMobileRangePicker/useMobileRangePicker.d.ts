import * as React from 'react';
import { DateOrTimeViewWithMeridiem } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { UseMobileRangePickerParams, UseMobileRangePickerProps } from './useMobileRangePicker.types';
export declare const useMobileRangePicker: <TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TEnableAccessibleFieldDOMStructure extends boolean, TExternalProps extends UseMobileRangePickerProps<TDate, TView, TEnableAccessibleFieldDOMStructure, any, TExternalProps>>({ props, ...pickerParams }: UseMobileRangePickerParams<TDate, TView, TEnableAccessibleFieldDOMStructure, TExternalProps>) => {
    renderPicker: () => React.JSX.Element;
};

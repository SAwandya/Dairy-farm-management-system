import * as React from 'react';
import { DateOrTimeViewWithMeridiem } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { UseDesktopRangePickerParams, UseDesktopRangePickerProps } from './useDesktopRangePicker.types';
export declare const useDesktopRangePicker: <TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TEnableAccessibleFieldDOMStructure extends boolean, TExternalProps extends UseDesktopRangePickerProps<TDate, TView, TEnableAccessibleFieldDOMStructure, any, TExternalProps>>({ props, ...pickerParams }: UseDesktopRangePickerParams<TDate, TView, TEnableAccessibleFieldDOMStructure, TExternalProps>) => {
    renderPicker: () => React.JSX.Element;
};

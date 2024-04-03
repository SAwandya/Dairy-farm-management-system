import { PickerValidDate } from '@mui/x-date-pickers/models';
import type { UseMultiInputTimeRangeFieldParams } from '../../../MultiInputTimeRangeField/MultiInputTimeRangeField.types';
import type { UseMultiInputRangeFieldResponse } from './useMultiInputRangeField.types';
export declare const useMultiInputTimeRangeField: <TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean, TTextFieldSlotProps extends {}>({ sharedProps: inSharedProps, startTextFieldProps, unstableStartFieldRef, endTextFieldProps, unstableEndFieldRef, }: UseMultiInputTimeRangeFieldParams<TDate, TEnableAccessibleFieldDOMStructure, TTextFieldSlotProps>) => UseMultiInputRangeFieldResponse<TEnableAccessibleFieldDOMStructure, TTextFieldSlotProps>;

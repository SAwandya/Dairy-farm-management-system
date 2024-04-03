import { PickerValidDate } from '@mui/x-date-pickers/models';
import { UseMultiInputDateRangeFieldParams } from '../../../MultiInputDateRangeField/MultiInputDateRangeField.types';
import type { UseMultiInputRangeFieldResponse } from './useMultiInputRangeField.types';
export declare const useMultiInputDateRangeField: <TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean, TTextFieldSlotProps extends {}>({ sharedProps: inSharedProps, startTextFieldProps, unstableStartFieldRef, endTextFieldProps, unstableEndFieldRef, }: UseMultiInputDateRangeFieldParams<TDate, TEnableAccessibleFieldDOMStructure, TTextFieldSlotProps>) => UseMultiInputRangeFieldResponse<TEnableAccessibleFieldDOMStructure, TTextFieldSlotProps>;

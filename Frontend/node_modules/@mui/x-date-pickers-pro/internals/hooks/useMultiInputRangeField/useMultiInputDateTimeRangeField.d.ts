import { PickerValidDate } from '@mui/x-date-pickers/models';
import type { UseMultiInputDateTimeRangeFieldParams } from '../../../MultiInputDateTimeRangeField/MultiInputDateTimeRangeField.types';
import type { UseMultiInputRangeFieldResponse } from './useMultiInputRangeField.types';
export declare const useMultiInputDateTimeRangeField: <TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean, TTextFieldSlotProps extends {}>({ sharedProps: inSharedProps, startTextFieldProps, unstableStartFieldRef, endTextFieldProps, unstableEndFieldRef, }: UseMultiInputDateTimeRangeFieldParams<TDate, TEnableAccessibleFieldDOMStructure, TTextFieldSlotProps>) => UseMultiInputRangeFieldResponse<TEnableAccessibleFieldDOMStructure, TTextFieldSlotProps>;

import { TimezoneProps } from '@mui/x-date-pickers/models';
import { Validator, BaseTimeValidationProps, DefaultizedProps } from '@mui/x-date-pickers/internals';
import { TimeRangeValidationError, DateRange } from '../../../models';
export interface TimeRangeComponentValidationProps extends Required<BaseTimeValidationProps>, DefaultizedProps<TimezoneProps, 'timezone'> {
}
export declare const validateTimeRange: Validator<DateRange<any>, any, TimeRangeValidationError, TimeRangeComponentValidationProps>;

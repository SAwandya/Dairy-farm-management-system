import { PickerValidDate, TimezoneProps } from '@mui/x-date-pickers/models';
import { Validator, BaseDateValidationProps, DefaultizedProps } from '@mui/x-date-pickers/internals';
import { DayRangeValidationProps } from '../../models';
import { DateRangeValidationError, DateRange } from '../../../models';
export interface DateRangeComponentValidationProps<TDate extends PickerValidDate> extends DayRangeValidationProps<TDate>, Required<BaseDateValidationProps<TDate>>, DefaultizedProps<TimezoneProps, 'timezone'> {
}
export declare const validateDateRange: Validator<DateRange<any>, any, DateRangeValidationError, DateRangeComponentValidationProps<any>>;

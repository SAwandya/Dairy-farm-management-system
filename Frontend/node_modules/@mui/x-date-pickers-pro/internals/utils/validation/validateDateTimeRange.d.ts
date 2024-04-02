import { PickerValidDate, TimezoneProps } from '@mui/x-date-pickers/models';
import { Validator, BaseDateValidationProps, TimeValidationProps, DefaultizedProps } from '@mui/x-date-pickers/internals';
import { DayRangeValidationProps } from '../../models/dateRange';
import { DateTimeRangeValidationError, DateRange } from '../../../models';
export interface DateTimeRangeComponentValidationProps<TDate extends PickerValidDate> extends DayRangeValidationProps<TDate>, TimeValidationProps<TDate>, Required<BaseDateValidationProps<TDate>>, DefaultizedProps<TimezoneProps, 'timezone'> {
}
export declare const validateDateTimeRange: Validator<DateRange<any>, any, DateTimeRangeValidationError, DateTimeRangeComponentValidationProps<any>>;

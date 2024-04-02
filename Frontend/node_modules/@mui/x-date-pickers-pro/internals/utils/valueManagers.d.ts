import { PickerValueManager, FieldValueManager } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import type { DateRangeValidationError, DateTimeRangeValidationError, TimeRangeValidationError, RangeFieldSection, DateRange } from '../../models';
export type RangePickerValueManager<TValue = [any, any], TDate extends PickerValidDate = any, TError extends DateRangeValidationError | TimeRangeValidationError | DateTimeRangeValidationError = any> = PickerValueManager<TValue, TDate, TError>;
export declare const rangeValueManager: RangePickerValueManager;
export declare const getRangeFieldValueManager: <TDate extends PickerValidDate>({ dateSeparator, }: {
    dateSeparator: string | undefined;
}) => FieldValueManager<DateRange<TDate>, TDate, RangeFieldSection>;

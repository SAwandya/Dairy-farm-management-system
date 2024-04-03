import { MuiPickersAdapter, PickerValidDate } from '@mui/x-date-pickers/models';
import { DateRange, RangePosition } from '../../models';
interface CalculateRangeChangeOptions<TDate extends PickerValidDate> {
    utils: MuiPickersAdapter<TDate>;
    range: DateRange<TDate>;
    newDate: TDate | null;
    rangePosition: RangePosition;
    /**
     * Should allow flipping range `start` and `end` dates if the `newDate` would result in a new range creation.
     *
     * It is used to allow dragging range `start` date past `end` date essentially becoming the new `end` date and vice versa.
     */
    allowRangeFlip?: boolean;
    shouldMergeDateAndTime?: boolean;
}
interface CalculateRangeChangeResponse<TDate extends PickerValidDate> {
    nextSelection: RangePosition;
    newRange: DateRange<TDate>;
}
export declare function calculateRangeChange<TDate extends PickerValidDate>({ utils, range, newDate: selectedDate, rangePosition, allowRangeFlip, shouldMergeDateAndTime, }: CalculateRangeChangeOptions<TDate>): CalculateRangeChangeResponse<TDate>;
export declare function calculateRangePreview<TDate extends PickerValidDate>(options: CalculateRangeChangeOptions<TDate>): DateRange<TDate>;
export {};

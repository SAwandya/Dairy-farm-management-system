export interface DateRangeCalendarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the container of a month. */
    monthContainer: string;
    /** Styles applied to the day calendar container when dragging */
    dayDragging: string;
}
export type DateRangeCalendarClassKey = keyof DateRangeCalendarClasses;
export declare const getDateRangeCalendarUtilityClass: (slot: string) => string;
export declare const dateRangeCalendarClasses: DateRangeCalendarClasses;

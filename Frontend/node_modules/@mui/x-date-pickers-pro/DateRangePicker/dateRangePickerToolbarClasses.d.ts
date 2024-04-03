export interface DateRangePickerToolbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the container element. */
    container: string;
}
export type DateRangePickerToolbarClassKey = keyof DateRangePickerToolbarClasses;
export declare function getDateRangePickerToolbarUtilityClass(slot: string): string;
export declare const dateRangePickerToolbarClasses: DateRangePickerToolbarClasses;

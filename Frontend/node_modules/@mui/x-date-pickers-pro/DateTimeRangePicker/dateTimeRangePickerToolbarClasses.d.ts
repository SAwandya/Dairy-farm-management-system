export interface DateTimeRangePickerToolbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the start toolbar element. */
    startToolbar: string;
    /** Styles applied to the end toolbar element. */
    endToolbar: string;
}
export type DateTimeRangePickerToolbarClassKey = keyof DateTimeRangePickerToolbarClasses;
export declare function getDateTimeRangePickerToolbarUtilityClass(slot: string): string;
export declare const dateTimeRangePickerToolbarClasses: DateTimeRangePickerToolbarClasses;

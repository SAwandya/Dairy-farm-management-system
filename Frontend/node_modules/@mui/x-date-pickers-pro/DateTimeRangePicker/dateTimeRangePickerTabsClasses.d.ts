export interface DateTimeRangePickerTabsClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the tab button element. */
    tabButton: string;
    /** Styles applied to the tab navigation button elements. */
    navigationButton: string;
    /** Styles applied to the filler element, shown instead of a navigation arrow. */
    filler: string;
}
export type DateTimeRangePickerTabsClassKey = keyof DateTimeRangePickerTabsClasses;
export declare function getDateTimeRangePickerTabsUtilityClass(slot: string): string;
export declare const dateTimeRangePickerTabsClasses: DateTimeRangePickerTabsClasses;

import { RangeFieldSection } from '../../models';
export declare const splitDateRangeSections: (sections: RangeFieldSection[]) => {
    startDate: RangeFieldSection[];
    endDate: RangeFieldSection[];
};
export declare const removeLastSeparator: (dateSections: RangeFieldSection[]) => (RangeFieldSection | {
    separator: null;
    dateName: "end" | "start";
    value: string;
    format: string;
    maxLength: number | null;
    placeholder: string;
    type: import("@mui/x-date-pickers").FieldSectionType;
    contentType: import("@mui/x-date-pickers").FieldSectionContentType;
    hasLeadingZerosInFormat: boolean;
    hasLeadingZerosInInput: boolean;
    modified: boolean;
    startSeparator: string;
    endSeparator: string;
})[];

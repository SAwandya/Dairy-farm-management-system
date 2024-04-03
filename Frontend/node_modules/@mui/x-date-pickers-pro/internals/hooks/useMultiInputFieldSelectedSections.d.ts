import * as React from 'react';
import { UseFieldInternalProps } from '@mui/x-date-pickers/internals';
import { FieldRef, FieldSelectedSections } from '@mui/x-date-pickers/models';
import { RangeFieldSection } from '../../models';
interface UseMultiInputFieldSelectedSectionsParams extends Pick<UseFieldInternalProps<any, any, RangeFieldSection, any, any>, 'selectedSections' | 'onSelectedSectionsChange'> {
    unstableStartFieldRef?: React.Ref<FieldRef<RangeFieldSection>>;
    unstableEndFieldRef?: React.Ref<FieldRef<RangeFieldSection>>;
}
export declare const useMultiInputFieldSelectedSections: (params: UseMultiInputFieldSelectedSectionsParams) => {
    start: {
        unstableFieldRef: React.Ref<FieldRef<RangeFieldSection>> | undefined;
        selectedSections: FieldSelectedSections;
        onSelectedSectionsChange: (newSelectedSections: FieldSelectedSections) => void;
    };
    end: {
        unstableFieldRef: ((instance: FieldRef<RangeFieldSection> | null) => void) | null;
        selectedSections: FieldSelectedSections;
        onSelectedSectionsChange: (newSelectedSections: FieldSelectedSections) => void;
    };
};
export {};

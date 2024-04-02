import * as React from 'react';
import useForkRef from '@mui/utils/useForkRef';
import useEventCallback from '@mui/utils/useEventCallback';
export const useMultiInputFieldSelectedSections = params => {
  const unstableEndFieldRef = React.useRef(null);
  const handleUnstableEndFieldRef = useForkRef(params.unstableEndFieldRef, unstableEndFieldRef);
  const [startSelectedSection, setStartSelectedSection] = React.useState(params.selectedSections ?? null);
  const [endSelectedSection, setEndSelectedSection] = React.useState(null);
  const getActiveField = () => {
    if (unstableEndFieldRef.current && unstableEndFieldRef.current.isFieldFocused()) {
      return 'end';
    }
    return 'start';
  };
  const handleStartSelectedSectionChange = useEventCallback(newSelectedSections => {
    setStartSelectedSection(newSelectedSections);
    if (getActiveField() === 'start') {
      params.onSelectedSectionsChange?.(newSelectedSections);
    }
  });
  const handleEndSelectedSectionChange = useEventCallback(newSelectedSections => {
    setEndSelectedSection(newSelectedSections);
    if (getActiveField() === 'end') {
      params.onSelectedSectionsChange?.(newSelectedSections);
    }
  });
  const activeField = getActiveField();
  return {
    start: {
      unstableFieldRef: params.unstableStartFieldRef,
      selectedSections: activeField === 'start' && params.selectedSections !== undefined ? params.selectedSections : startSelectedSection,
      onSelectedSectionsChange: handleStartSelectedSectionChange
    },
    end: {
      unstableFieldRef: handleUnstableEndFieldRef,
      selectedSections: activeField === 'end' && params.selectedSections !== undefined ? params.selectedSections : endSelectedSection,
      onSelectedSectionsChange: handleEndSelectedSectionChange
    }
  };
};
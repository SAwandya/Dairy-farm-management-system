import useControlled from '@mui/utils/useControlled';
import useEventCallback from '@mui/utils/useEventCallback';
export const useRangePosition = (props, singleInputFieldRef) => {
  const [rangePosition, setRangePosition] = useControlled({
    name: 'useRangePosition',
    state: 'rangePosition',
    controlled: props.rangePosition,
    default: props.defaultRangePosition ?? 'start'
  });

  // When using a single input field,
  // we want to select the 1st section of the edited date when updating the range position.
  const syncRangePositionWithSingleInputField = newRangePosition => {
    if (singleInputFieldRef?.current == null) {
      return;
    }
    const sections = singleInputFieldRef.current.getSections();
    const targetActiveSectionIndex = newRangePosition === 'start' ? 0 : sections.length / 2;
    singleInputFieldRef.current.setSelectedSections(targetActiveSectionIndex);
  };
  const handleRangePositionChange = useEventCallback(newRangePosition => {
    setRangePosition(newRangePosition);
    props.onRangePositionChange?.(newRangePosition);
    syncRangePositionWithSingleInputField(newRangePosition);
  });
  return {
    rangePosition,
    onRangePositionChange: handleRangePositionChange
  };
};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRangePosition = void 0;
var _useControlled = _interopRequireDefault(require("@mui/utils/useControlled"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
const useRangePosition = (props, singleInputFieldRef) => {
  const [rangePosition, setRangePosition] = (0, _useControlled.default)({
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
  const handleRangePositionChange = (0, _useEventCallback.default)(newRangePosition => {
    setRangePosition(newRangePosition);
    props.onRangePositionChange?.(newRangePosition);
    syncRangePositionWithSingleInputField(newRangePosition);
  });
  return {
    rangePosition,
    onRangePositionChange: handleRangePositionChange
  };
};
exports.useRangePosition = useRangePosition;
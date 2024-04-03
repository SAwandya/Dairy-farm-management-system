import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["rangePosition", "onRangePositionChange", "viewRenderer", "value", "onChange", "defaultValue", "onViewChange", "views", "className"];
import { isInternalTimeView, useUtils } from '@mui/x-date-pickers/internals';
import { isRangeValid } from '../internals/utils/date-utils';
import { calculateRangeChange } from '../internals/utils/date-range-manager';
/**
 * @ignore - internal component.
 */
function DateTimeRangePickerTimeWrapper(props, ref) {
  const utils = useUtils();
  const {
      rangePosition,
      onRangePositionChange,
      viewRenderer,
      value,
      onChange,
      defaultValue,
      onViewChange,
      views
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  if (!viewRenderer) {
    return null;
  }
  const currentValue = (rangePosition === 'start' ? value?.[0] : value?.[1]) ?? null;
  const currentDefaultValue = (rangePosition === 'start' ? defaultValue?.[0] : defaultValue?.[1]) ?? null;
  const handleOnChange = (newDate, selectionState, selectedView) => {
    if (!onChange || !value) {
      return;
    }
    const {
      newRange
    } = calculateRangeChange({
      newDate,
      utils,
      range: value,
      rangePosition
    });
    const isFullRangeSelected = rangePosition === 'end' && isRangeValid(utils, newRange);
    const timeViews = views.filter(isInternalTimeView);
    // reset view to the first time view and swap range position after selecting the last time view (start or end position)
    if (selectedView === timeViews[timeViews.length - 1] && onViewChange) {
      onViewChange(views[0]);
      onRangePositionChange(rangePosition === 'start' ? 'end' : 'start');
    }
    onChange(newRange, isFullRangeSelected ? 'finish' : 'partial', selectedView);
  };
  return viewRenderer(_extends({}, other, {
    ref,
    views,
    onViewChange,
    value: currentValue,
    onChange: handleOnChange,
    defaultValue: currentDefaultValue
  }));
}
export { DateTimeRangePickerTimeWrapper };
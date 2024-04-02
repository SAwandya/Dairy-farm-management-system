import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getDateTimeRangePickerTabsUtilityClass(slot) {
  return generateUtilityClass('MuiDateTimeRangePickerTabs', slot);
}
export const dateTimeRangePickerTabsClasses = generateUtilityClasses('MuiDateTimeRangePickerTabs', ['root', 'tabButton', 'navigationButton', 'filler']);
import _extends from "@babel/runtime/helpers/esm/extends";
import { useThemeProps } from '@mui/material/styles';
import { useDefaultDates, useUtils, applyDefaultDate, applyDefaultViewProps, resolveTimeViewsResponse } from '@mui/x-date-pickers/internals';
import { DateTimeRangePickerToolbar } from './DateTimeRangePickerToolbar';
import { DateTimeRangePickerTabs } from './DateTimeRangePickerTabs';
export function useDateTimeRangePickerDefaultizedProps(props, name) {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const themeProps = useThemeProps({
    props,
    name
  });
  const ampm = themeProps.ampm ?? utils.is12HourCycleInCurrentLocale();
  const {
    openTo,
    views: defaultViews
  } = applyDefaultViewProps({
    views: themeProps.views,
    openTo: themeProps.openTo,
    defaultViews: ['day', 'hours', 'minutes'],
    defaultOpenTo: 'day'
  });
  const {
    shouldRenderTimeInASingleColumn,
    thresholdToRenderTimeInASingleColumn,
    views,
    timeSteps
  } = resolveTimeViewsResponse({
    thresholdToRenderTimeInASingleColumn: themeProps.thresholdToRenderTimeInASingleColumn,
    ampm,
    timeSteps: themeProps.timeSteps,
    views: defaultViews
  });
  return _extends({}, themeProps, {
    timeSteps,
    openTo,
    shouldRenderTimeInASingleColumn,
    thresholdToRenderTimeInASingleColumn,
    views,
    ampm,
    disableFuture: themeProps.disableFuture ?? false,
    disablePast: themeProps.disablePast ?? false,
    minDate: applyDefaultDate(utils, themeProps.minDateTime ?? themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDateTime ?? themeProps.maxDate, defaultDates.maxDate),
    minTime: themeProps.minDateTime ?? themeProps.minTime,
    maxTime: themeProps.maxDateTime ?? themeProps.maxTime,
    disableIgnoringDatePartForTimeValidation: themeProps.disableIgnoringDatePartForTimeValidation ?? Boolean(themeProps.minDateTime || themeProps.maxDateTime ||
    // allow digital clocks to correctly check time validity: https://github.com/mui/mui-x/issues/12048
    themeProps.disablePast || themeProps.disableFuture),
    slots: _extends({
      tabs: DateTimeRangePickerTabs,
      toolbar: DateTimeRangePickerToolbar
    }, themeProps.slots),
    slotProps: _extends({}, themeProps.slotProps, {
      toolbar: _extends({}, themeProps.slotProps?.toolbar, {
        ampm
      })
    })
  });
}
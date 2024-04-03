import _extends from "@babel/runtime/helpers/esm/extends";
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useTimeField as useTimeField } from '@mui/x-date-pickers/TimeField';
import { useLocalizationContext, useValidation, useControlledValueWithTimezone, useDefaultizedTimeField } from '@mui/x-date-pickers/internals';
import { validateTimeRange } from '../../utils/validation/validateTimeRange';
import { rangeValueManager } from '../../utils/valueManagers';
import { excludeProps } from './shared';
import { useMultiInputFieldSelectedSections } from '../useMultiInputFieldSelectedSections';
export const useMultiInputTimeRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  unstableStartFieldRef,
  endTextFieldProps,
  unstableEndFieldRef
}) => {
  const sharedProps = useDefaultizedTimeField(inSharedProps);
  const adapter = useLocalizationContext();
  const {
    value: valueProp,
    defaultValue,
    format,
    formatDensity,
    shouldRespectLeadingZeros,
    onChange,
    disabled,
    readOnly,
    selectedSections,
    onSelectedSectionsChange,
    timezone: timezoneProp,
    enableAccessibleFieldDOMStructure,
    autoFocus
  } = sharedProps;
  const {
    value,
    handleValueChange,
    timezone
  } = useControlledValueWithTimezone({
    name: 'useMultiInputDateRangeField',
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    onChange,
    valueManager: rangeValueManager
  });

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  const buildChangeHandler = index => {
    return (newDate, rawContext) => {
      const newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      const context = _extends({}, rawContext, {
        validationError: validateTimeRange({
          adapter,
          value: newDateRange,
          props: _extends({}, sharedProps, {
            timezone
          })
        })
      });
      handleValueChange(newDateRange, context);
    };
  };
  const handleStartDateChange = useEventCallback(buildChangeHandler(0));
  const handleEndDateChange = useEventCallback(buildChangeHandler(1));
  const validationError = useValidation(_extends({}, sharedProps, {
    value,
    timezone
  }), validateTimeRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  const selectedSectionsResponse = useMultiInputFieldSelectedSections({
    selectedSections,
    onSelectedSectionsChange,
    unstableStartFieldRef,
    unstableEndFieldRef
  });
  const startFieldProps = _extends({
    error: !!validationError[0]
  }, startTextFieldProps, selectedSectionsResponse.start, {
    disabled,
    readOnly,
    format,
    formatDensity,
    shouldRespectLeadingZeros,
    timezone,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange,
    enableAccessibleFieldDOMStructure,
    autoFocus // Do not add on end field.
  });
  const endFieldProps = _extends({
    error: !!validationError[1]
  }, endTextFieldProps, selectedSectionsResponse.end, {
    format,
    formatDensity,
    shouldRespectLeadingZeros,
    disabled,
    readOnly,
    timezone,
    value: valueProp === undefined ? undefined : valueProp[1],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[1],
    onChange: handleEndDateChange,
    enableAccessibleFieldDOMStructure
  });
  const startDateResponse = useTimeField(startFieldProps);
  const endDateResponse = useTimeField(endFieldProps);

  /* TODO: Undo this change when a clearable behavior for multiple input range fields is implemented */
  return {
    startDate: excludeProps(startDateResponse, ['clearable', 'onClear']),
    endDate: excludeProps(endDateResponse, ['clearable', 'onClear'])
  };
};
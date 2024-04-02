"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMultiInputDateTimeRangeField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _DateTimeField = require("@mui/x-date-pickers/DateTimeField");
var _internals = require("@mui/x-date-pickers/internals");
var _validateDateTimeRange = require("../../utils/validation/validateDateTimeRange");
var _valueManagers = require("../../utils/valueManagers");
var _shared = require("./shared");
var _useMultiInputFieldSelectedSections = require("../useMultiInputFieldSelectedSections");
const useMultiInputDateTimeRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  unstableStartFieldRef,
  endTextFieldProps,
  unstableEndFieldRef
}) => {
  const sharedProps = (0, _internals.useDefaultizedDateTimeField)(inSharedProps);
  const adapter = (0, _internals.useLocalizationContext)();
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
  } = (0, _internals.useControlledValueWithTimezone)({
    name: 'useMultiInputDateRangeField',
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    onChange,
    valueManager: _valueManagers.rangeValueManager
  });

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  const buildChangeHandler = index => {
    return (newDate, rawContext) => {
      const newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      const context = (0, _extends2.default)({}, rawContext, {
        validationError: (0, _validateDateTimeRange.validateDateTimeRange)({
          adapter,
          value: newDateRange,
          props: (0, _extends2.default)({}, sharedProps, {
            timezone
          })
        })
      });
      handleValueChange(newDateRange, context);
    };
  };
  const handleStartDateChange = (0, _useEventCallback.default)(buildChangeHandler(0));
  const handleEndDateChange = (0, _useEventCallback.default)(buildChangeHandler(1));
  const validationError = (0, _internals.useValidation)((0, _extends2.default)({}, sharedProps, {
    value,
    timezone
  }), _validateDateTimeRange.validateDateTimeRange, _valueManagers.rangeValueManager.isSameError, _valueManagers.rangeValueManager.defaultErrorState);
  const selectedSectionsResponse = (0, _useMultiInputFieldSelectedSections.useMultiInputFieldSelectedSections)({
    selectedSections,
    onSelectedSectionsChange,
    unstableStartFieldRef,
    unstableEndFieldRef
  });
  const startFieldProps = (0, _extends2.default)({
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
  const endFieldProps = (0, _extends2.default)({
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
  const startDateResponse = (0, _DateTimeField.unstable_useDateTimeField)(startFieldProps);
  const endDateResponse = (0, _DateTimeField.unstable_useDateTimeField)(endFieldProps);

  /* TODO: Undo this change when a clearable behavior for multiple input range fields is implemented */
  return {
    startDate: (0, _shared.excludeProps)(startDateResponse, ['clearable', 'onClear']),
    endDate: (0, _shared.excludeProps)(endDateResponse, ['clearable', 'onClear'])
  };
};
exports.useMultiInputDateTimeRangeField = useMultiInputDateTimeRangeField;
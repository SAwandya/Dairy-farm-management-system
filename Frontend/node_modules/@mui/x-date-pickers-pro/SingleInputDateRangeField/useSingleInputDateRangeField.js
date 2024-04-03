import * as React from 'react';
import { useField, splitFieldInternalAndForwardedProps, useDefaultizedDateField } from '@mui/x-date-pickers/internals';
import { rangeValueManager, getRangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateDateRange } from '../internals/utils/validation/validateDateRange';
export const useSingleInputDateRangeField = inProps => {
  const props = useDefaultizedDateField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'date');
  const fieldValueManager = React.useMemo(() => getRangeFieldValueManager({
    dateSeparator: internalProps.dateSeparator
  }), [internalProps.dateSeparator]);
  return useField({
    forwardedProps,
    internalProps,
    valueManager: rangeValueManager,
    fieldValueManager,
    validator: validateDateRange,
    valueType: 'date'
  });
};
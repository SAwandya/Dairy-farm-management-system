import * as React from 'react';
import { useField, splitFieldInternalAndForwardedProps, useDefaultizedDateTimeField } from '@mui/x-date-pickers/internals';
import { rangeValueManager, getRangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateDateTimeRange } from '../internals/utils/validation/validateDateTimeRange';
export const useSingleInputDateTimeRangeField = inProps => {
  const props = useDefaultizedDateTimeField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'date-time');
  const fieldValueManager = React.useMemo(() => getRangeFieldValueManager({
    dateSeparator: internalProps.dateSeparator
  }), [internalProps.dateSeparator]);
  return useField({
    forwardedProps,
    internalProps,
    valueManager: rangeValueManager,
    fieldValueManager,
    validator: validateDateTimeRange,
    valueType: 'date-time'
  });
};
import * as React from 'react';
import { useField, splitFieldInternalAndForwardedProps, useDefaultizedTimeField } from '@mui/x-date-pickers/internals';
import { rangeValueManager, getRangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateTimeRange } from '../internals/utils/validation/validateTimeRange';
export const useSingleInputTimeRangeField = inProps => {
  const props = useDefaultizedTimeField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'time');
  const fieldValueManager = React.useMemo(() => getRangeFieldValueManager({
    dateSeparator: internalProps.dateSeparator
  }), [internalProps.dateSeparator]);
  return useField({
    forwardedProps,
    internalProps,
    valueManager: rangeValueManager,
    fieldValueManager,
    validator: validateTimeRange,
    valueType: 'time'
  });
};
import { validateTime } from '@mui/x-date-pickers/internals';
import { isRangeValid } from '../date-utils';
export const validateTimeRange = ({
  props,
  value,
  adapter
}) => {
  const [start, end] = value;
  const dateTimeValidations = [validateTime({
    adapter,
    value: start,
    props
  }), validateTime({
    adapter,
    value: end,
    props
  })];
  if (dateTimeValidations[0] || dateTimeValidations[1]) {
    return dateTimeValidations;
  }

  // for partial input
  if (start === null || end === null) {
    return [null, null];
  }
  if (!isRangeValid(adapter.utils, value)) {
    return ['invalidRange', 'invalidRange'];
  }
  return [null, null];
};
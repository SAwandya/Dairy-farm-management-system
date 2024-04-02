import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["shouldDisableDate"];
import { validateDate } from '@mui/x-date-pickers/internals';
import { isRangeValid } from '../date-utils';
export const validateDateRange = ({
  props,
  value,
  adapter
}) => {
  const [start, end] = value;
  const {
      shouldDisableDate
    } = props,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  const dateValidations = [validateDate({
    adapter,
    value: start,
    props: _extends({}, otherProps, {
      shouldDisableDate: day => !!shouldDisableDate?.(day, 'start')
    })
  }), validateDate({
    adapter,
    value: end,
    props: _extends({}, otherProps, {
      shouldDisableDate: day => !!shouldDisableDate?.(day, 'end')
    })
  })];
  if (dateValidations[0] || dateValidations[1]) {
    return dateValidations;
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
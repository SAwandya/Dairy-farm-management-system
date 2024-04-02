/* TODO: remove this when a clearable behavior for multiple input range fields is implemented */
export const excludeProps = (props, excludedProps) => {
  return Object.keys(props).reduce((acc, key) => {
    if (!excludedProps.includes(key)) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
};
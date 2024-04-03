import _extends from "@babel/runtime/helpers/esm/extends";
export const splitDateRangeSections = sections => {
  const startDateSections = [];
  const endDateSections = [];
  sections.forEach(section => {
    if (section.dateName === 'start') {
      startDateSections.push(section);
    } else {
      endDateSections.push(section);
    }
  });
  return {
    startDate: startDateSections,
    endDate: endDateSections
  };
};
export const removeLastSeparator = dateSections => dateSections.map((section, sectionIndex) => {
  if (sectionIndex === dateSections.length - 1) {
    return _extends({}, section, {
      separator: null
    });
  }
  return section;
});


const validateForm = (row) => {
  const errors = {};

  if (!row || !row.name) {
    errors.name = 'Name is required';
  }

  if (!row || !row.email || !/\S+@\S+\.\S+/.test(row.email)) {
    errors.email = 'Invalid email';
  }

//   if (!row || !row.date || new Date(row.date) < new Date()) {
//     errors.date = 'Date cannot be before today';
//   }


  return errors;
};

export default validateForm;
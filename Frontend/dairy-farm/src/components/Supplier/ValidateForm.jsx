

const validateForm = (row) => {
  const errors = {};

  if (!row || !row.name) {
    errors.name = 'Name is required';
  }

  if (!row || !row.email || !/\S+@\S+\.\S+/.test(row.email)) {
    errors.email = 'Invalid email';
  }

  return errors;
};

export default validateForm;
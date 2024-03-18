import React from 'react';
import TextField from '@mui/material/TextField';

function CustomTextField(props) {
  const { id, label, variant, ...otherProps } = props;

  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      InputProps={{
        style: {
          borderRadius: "15px",
        }
      }}
      {...otherProps}
      sx={{
        width: '70%',
        mb: 0,
        borderRadius: '150px', // Add curved corners // Adjust height as needed
        marginLeft: '50px',
      }}
    />
  );
}

export default CustomTextField;

import React from "react";
import TextField from "@mui/material/TextField";

const InputField = (props) => {

  const { id, label, type, signup, errors, minlength } = props;

  return (
    <>
      <TextField
        autoComplete="given-name"
        id={id}
        required
        fullWidth
        label={label}
        type={type}
        {...signup}
        autoFocus
      />

      {errors?.type === "required" && (
        <Alert severity="warning">The {id} filed is canot be empty </Alert>
      )}
      {errors?.type === "minLength" && (
        <Alert severity="warning">
          The {id} must be at leat {minlength}
        </Alert>
      )}
    </>
  );
};

export default InputField;

import React from "react";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";

const InputField = (props) => {

  const {
    id,
    label,
    type,
    signup,
    errors,
    minlength,
    defaultValue,
    disable,
    inputProps,
  } = props;

  return (
    <>
      <TextField
        autoComplete="given-name"
        id={id}
        required
        disabled={disable}
        fullWidth
        min={inputProps}
        defaultValue={defaultValue}
        label={label}
        type={type}
        {...signup}
        margin="normal"
      />

      {errors?.type === "required" && (
        <Alert severity="error">The {id} filed is canot be empty </Alert>
      )}
      {errors?.type === "minLength" && (
        <Alert severity="error">
          The {id} must be at leat {minlength}
        </Alert>
      )}
      {errors?.type === "positive" && (
        <Alert severity="error">Only valid prositive numbers</Alert>
      )}
      {errors?.type === "validate" && (
        <Alert severity="error">Enter valid date</Alert>
      )}
      {errors?.type === "pattern" && (
        <Alert severity="error">Enter valid email address </Alert>
      )}
      {/* {errors?.type && <Alert severity="error">{errors?.type}</Alert>} */}
    </>
  );
};

export default InputField;

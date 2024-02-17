import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputField from "./InputField";

const AddressForm = (props) => {

    const { register, errors } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            id="firstName"
            label="First name"
            type="text"
            signup={{
              ...register("firstName", { required: true }),
            }}
            errors={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            id="lastname"
            label="Last name"
            type="text"
            signup={{
              ...register("lastname", { required: true }),
            }}
            errors={errors.lastname}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            id="address1"
            label="Address 1"
            type="text"
            signup={{
              ...register("address1", { required: true }),
            }}
            errors={errors.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            id="address2"
            label="Address 2"
            type="text"
            signup={{
              ...register("address2", { required: true }),
            }}
            errors={errors.address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            id="city"
            label="city"
            type="text"
            signup={{
              ...register("city", { required: true }),
            }}
            errors={errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          
          <InputField
            id="state"
            label="state"
            type="text"
            signup={{
              ...register("state", { required: true }),
            }}
            errors={errors.state}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;
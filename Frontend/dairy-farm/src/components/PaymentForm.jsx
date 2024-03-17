import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputField from "./InputField";

const PaymentForm = (props) => {

  const { register, errors } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            id="cardName"
            label="cardName"
            type="text"
            signup={{
              ...register("cardName", { required: true }),
            }}
            errors={errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            id="cardNumber"
            label="cardNumber"
            type="text"
            signup={{
              ...register("cardNumber", { required: true }),
            }}
            errors={errors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            id="expDate"
            label="expDate"
            type="text"
            signup={{
              ...register("expDate", { required: true }),
            }}
            errors={errors.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          
          <InputField
            id="cvv"
            label="CVV"
            type="text"
            signup={{
              ...register("cvv", { required: true }),
            }}
            errors={errors.cvv}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PaymentForm;
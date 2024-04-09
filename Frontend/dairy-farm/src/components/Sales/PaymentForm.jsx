import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputField from "./InputField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import usePayment from "../../hooks/usePayment";
import { useAuth } from "../../contexts/AuthContext";

const PaymentForm = (props) => {

  const { register, errors, checkPayment, setCheckPayment } = props;

  const { getCurrentUser } = useAuth();

  const { data } = usePayment(getCurrentUser()._id);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            id="cardName"
            label="Card name"
            type="text"
            defaultValue={checkPayment.cardName}
            signup={{
              ...register("cardName", {
                required: checkPayment == "" ? true : false,
              }),
            }}
            errors={errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            id="cardNumber"
            label="cardNumber"
            type="text"
            defaultValue={checkPayment.cardNumber}
            signup={{
              ...register("cardNumber", {
                required: checkPayment == "" ? true : false,
              }),
            }}
            errors={errors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            id="expDate"
            label="expDate"
            type="text"
            defaultValue={checkPayment?.expDate}
            signup={{
              ...register("expDate", {
                required: checkPayment == "" ? true : false,
              }),
            }}
            errors={errors.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            id="cvv"
            label="CVV"
            type="text"
            defaultValue={checkPayment?.cvv}
            signup={{
              ...register("cvv", {
                required: checkPayment == "" ? true : false,
              }),
            }}
            errors={errors.cvv}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                {...register("savePayment")}
                color="secondary"
                name="savePayment"
                value="yes"
              />
            }
            label="Save payment details"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Choose payment method
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {data?.map((payment) => (
              <FormControlLabel
                key={payment._id}
                value={payment.cardNumber}
                control={<Radio />}
                label={payment.cardNumber}
                onChange={() => setCheckPayment(payment)}
              />
            ))}
            <FormControlLabel
              value=""
              onChange={() => setCheckPayment(null)}
              control={<Radio />}
              label="non"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;

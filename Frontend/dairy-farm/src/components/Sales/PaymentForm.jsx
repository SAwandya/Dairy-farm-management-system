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
import { Box } from "@mui/material";

const PaymentForm = (props) => {
  const { register, errors } = props;

  const { getCurrentUser } = useAuth();

  const { data } = usePayment(getCurrentUser()._id);

  const [currentPayment, setCurrentPayment] = React.useState('');

  const handlePayment = (payment) => {

    const paymentString = JSON.stringify(payment);
    localStorage.setItem("paymentInfo", paymentString);
    const storePaymentString = localStorage.getItem("paymentInfo");
    const storedPayment = JSON.parse(storePaymentString);

    setCurrentPayment(payment);

    console.log(currentPayment);
    
  };

   React.useEffect(() => {
     console.log(currentPayment);
   }, [currentPayment]);

    const isDateValid = (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      return selectedDate >= today;
    };

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
            disable={currentPayment !== "" ? true : false}
            signup={{
              ...register("cardName", {
                required: currentPayment == "" ? true : false,
              }),
            }}
            errors={errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            id="cardNumber"
            label="cardNumber"
            type="number"
            disable={currentPayment !== "" ? true : false}
            signup={{
              ...register("cardNumber", {
                required: currentPayment == "" ? true : false,
              }),
            }}
            errors={errors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            id="expDate"
            label="Expire date"
            type="date"
            inputProps={new Date().toISOString().slice(0, 10)}
            disable={currentPayment !== "" ? true : false}
            signup={{
              ...register("expDate", {
                required: currentPayment == "" ? true : false,
                validate: currentPayment == "" ? isDateValid : undefined,
              }),
            }}
            errors={errors.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            id="cvv"
            label="CVV"
            type="number"
            disable={currentPayment !== "" ? true : false}
            signup={{
              ...register("cvv", {
                required: currentPayment == "" ? true : false,
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
              <Box sx={{ backgroundColor: "#90EE90", borderRadius: '10px', padding: "10px", margin: '5px' }}>
                <FormControlLabel
                  key={payment._id}
                  value={payment.cardNumber}
                  control={<Radio />}
                  label={
                    payment.cardNumber.toString().substring(0, 5) + "******"
                  }
                  onChange={() => handlePayment(payment)}
                />
              </Box>
            ))}

            <FormControlLabel
              value=""
              onChange={() => handlePayment("")}
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

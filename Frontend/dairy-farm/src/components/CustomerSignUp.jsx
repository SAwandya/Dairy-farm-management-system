import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const CustomerSignUp = () => {
 



  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item md={6} sm={6}>
                <InputField
                  id="name"
                  label="Company name"
                  type="text"
                  signup={{
                    ...register("name", { required: true, minLength: 3 }),
                  }}
                  errors={errors.name}
                  minLength="3"
                />
              </Grid>
              <Grid item md={6} sm={6}>
                <InputField
                  id="type"
                  label="Company type eg: corporation, partnership"
                  type="text"
                  signup={{
                    ...register("type", { required: true, minLength: 3 }),
                  }}
                  errors={errors.type}
                  minLength="3"
                />
              </Grid>
              <Grid item md={6} sm={6}>
                <InputField
                  id="address"
                  label="Business Address"
                  type="text"
                  signup={{
                    ...register("address", { required: true }),
                  }}
                  errors={errors.address}
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="phone"
                  label="Contact number"
                  type="number"
                  signup={{
                    ...register("phone", { required: true, minLength: 10 }),
                  }}
                  errors={errors.phone}
                  minLength="10"
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="rep"
                  label="Company Representative"
                  type="text"
                  signup={{
                    ...register("rep", { required: true, minLength: 5 }),
                  }}
                  errors={errors.rep}
                  minLength="5"
                />
              </Grid>
              <Grid item md={6} sm={6}>
                <InputField
                  id="licenseNo"
                  label="Business License No"
                  type="text"
                  signup={{
                    ...register("licenseNo", { required: true, minLength: 10 }),
                  }}
                  errors={errors.licenseNo}
                  minLength="10"
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  signup={{
                    ...register("email", { required: true }),
                  }}
                  errors={errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default CustomerSignUp;

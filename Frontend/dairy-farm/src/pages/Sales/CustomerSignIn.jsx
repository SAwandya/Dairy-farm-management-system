import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputField from "../../components/Sales/InputField";
import { useForm } from "react-hook-form";
import authService from "../../services/Sales/authService";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const defaultTheme = createTheme();

const CustomerSignIn = () => {
  const [error, setError] = React.useState();

  const { login, authToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    authService
      .AuthenticateUser(data)
      .then((res) => {
        console.log(res.customer.approvel);
        if (res.customer.approvel == false) {
          toast.error(
            "Still you do not have approvel. Sign in after recieve approvel"
          );
        } else {
          login(res.token);
          setError("");
        }
      })
      .catch((err) => {
        setError(err.response.data);
        if (err.response.status == 400) {
          console.log(err.response.status);
          toast.error("Invalide Email or Password");
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          // backgroundImage: "url(../src/assets/farm_sign.png)",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <ToastContainer />
          {authToken && <Navigate to="/" replace={true} />}
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "500px",
              width: "500px",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: 3,
              bgcolor: "#CDFAD5",
            }}
          >
            
              <img
                className="sidebar-logo"
                src="../../src/assets/sidebar-logo.png"
                alt="Logo"
              />
            
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <InputField
                id="email"
                label="Email"
                type="email"
                signup={{
                  ...register("email", { required: true }),
                }}
                errors={errors.email}
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                signup={{
                  ...register("password", { required: true }),
                }}
                errors={errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CustomerSignIn;

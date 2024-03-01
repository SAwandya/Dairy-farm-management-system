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
import InputField from "../components/InputField";
import productService from "../services/productService";
import useGameQueryStore from "../store";

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

const ProductUpdate = () => {

  const selectedProductUpdate = useGameQueryStore(
    (s) => s.selectedProductUpdate
  );

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = React.useState();
  const [message, setMessage] = React.useState();

  const onSubmit = (data) => {

    productService
      .Update(selectedProductUpdate, data)
      .then((res) => {
        console.log("Updated successfuly");
        setMessage("Update success");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err);
      });
  };

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
            Update Product
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item md={6} sm={6}>
                <InputField
                  id="name"
                  label="Product name"
                  type="text"
                  signup={{
                    ...register("name", { required: true }),
                  }}
                  errors={errors.name}
                  minLength="3"
                />
              </Grid>
              <Grid item md={6} sm={6}>
                <InputField
                  id="description"
                  label="Description"
                  type="text"
                  signup={{
                    ...register("description", {
                      required: true,
                      minLength: 3,
                    }),
                  }}
                  errors={errors.description}
                  minLength="3"
                />
              </Grid>
              <Grid item md={6} sm={6}>
                <InputField
                  id="category"
                  label="Category"
                  type="text"
                  signup={{
                    ...register("category", { required: true }),
                  }}
                  errors={errors.category}
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="price"
                  label="Unit price"
                  type="number"
                  signup={{
                    ...register("price", { required: true }),
                  }}
                  errors={errors.price}
                  minLength="10"
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="quantity"
                  label="Quantity"
                  type="text"
                  signup={{
                    ...register("quantity", { required: true }),
                  }}
                  errors={errors.quantity}
                  minLength="5"
                />
              </Grid>
              <Grid item md={6} sm={6}>
                <InputField
                  id="unitOfMeasurement"
                  label="Unit Of Measurement"
                  type="text"
                  signup={{
                    ...register("unitOfMeasurement", {
                      required: true,
                    
                    }),
                  }}
                  errors={errors.unitOfMeasurement}
                  minLength="10"
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="expirationDate"
                  label="ExpirationDate"
                  type="date"
                  signup={{
                    ...register("expirationDate", { required: true }),
                  }}
                  errors={errors.expirationDate}
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="manufacDtae"
                  label="Manufacture date"
                  type="date"
                  signup={{
                    ...register("manufacDtae", { required: true }),
                  }}
                  errors={errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2"></Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default ProductUpdate;

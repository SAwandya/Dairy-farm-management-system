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
import InputField from "../../components/Sales/InputField";
import productService from "../../services/Sales/productService";
import useGameQueryStore from "../../store";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useProduct from "../../hooks/useProduct";

const defaultTheme = createTheme();

const ProductUpdate = () => {
  const selectedProductUpdate = useGameQueryStore(
    (s) => s.selectedProductUpdate
  );

  // const { data: selcetedData } = useProduct(selectedProductUpdate);

  console.log(selectedProductUpdate);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = React.useState();
  const [message, setMessage] = React.useState();

  const onSubmit = (data) => {
    productService
      .Update(selectedProductUpdate._id, data)
      .then((res) => {
        console.log("Updated successfuly");
        setMessage("Update success");
        navigate("/salesdashboard");
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
                  defaultValue={selectedProductUpdate?.name}
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
                  defaultValue={selectedProductUpdate?.description}
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
                  defaultValue={selectedProductUpdate?.category}
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
                  defaultValue={selectedProductUpdate?.price}
                  signup={{
                    ...register("price", {
                      required: true,
                      validate: {
                        positive: (v) => parseInt(v) > 0,
                      },
                    }),
                  }}
                  errors={errors.price}
                  minLength="10"
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="quantity"
                  label="Quantity"
                  defaultValue={selectedProductUpdate?.quantity}
                  type="number"
                  signup={{
                    ...register("quantity", {
                      required: true,
                      validate: {
                        positive: (v) => parseInt(v) > 0,
                      },
                    }),
                  }}
                  errors={errors.quantity}
                  minLength="5"
                />
              </Grid>
              <Grid item md={6} sm={6}>
                <InputField
                  id="unitOfMeasurement"
                  label="Size"
                  type="text"
                  defaultValue={selectedProductUpdate?.unitOfMeasurement}
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
                  defaultValue={selectedProductUpdate?.expirationDate.substring(
                    0,
                    10
                  )}
                  type="text"
                  signup={{
                    ...register("expirationDate", {
                      required: true,
                      valueAsDate: true,
                    }),
                  }}
                  errors={errors.expirationDate}
                />
              </Grid>

              <Grid item md={6} sm={6}>
                <InputField
                  id="manufacDtae"
                  label="Manufacture date"
                  type="text"
                  defaultValue={selectedProductUpdate?.manufacDtae.substring(
                    0,
                    10
                  )}
                  signup={{
                    ...register("manufacDtae", {
                      required: true,
                      valueAsDate: true,
                    }),
                  }}
                  errors={errors.manufacDtae}
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
            <Button onClick={() => navigate('/salesdashboard')} variant="outlined" sx={{ mt: 3, mb: 2 }} type="submit" fullWidth>
              Cancel
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2"></Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProductUpdate;

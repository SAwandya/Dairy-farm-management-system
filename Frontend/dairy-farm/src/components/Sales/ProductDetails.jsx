import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material-next/Button";
import useGameQueryStore from "../../store";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { Alert } from "@mui/material";
import purchaseService from "../../services/Sales/purchaseService";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import addCartService from "../../services/Sales/addCartService";

const ProductDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectedProduct = useGameQueryStore((s) => s.selectedProduct);

  const SetSelectedQuantity = useGameQueryStore((s) => s.SetSelectedQuantity);

  const selectedBuyAddButton = useGameQueryStore((s) => s.selectedBuyAddButton);

  const { getCurrentUser } = useAuth();

  let navigate = useNavigate();

  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    if (data.quantity > selectedProduct.quantity) {
      setError(
        "Quantity entered " +
          data.quantity +
          " is greater than available products " +
          selectedProduct.quantity +
          ". Please enter a valid quantity."
      );
    } else {
      setError(null);
      SetSelectedQuantity(data);
      if (selectedBuyAddButton == "buy") {
        navigate("/checkout");
      } else {
        const cart = {
          quantity: data.quantity,
          productId: selectedProduct._id,
          customerId: getCurrentUser()._id,
        };

        addCartService
          .post(cart)
          .then((res) => {
            console.log(res.data);
            navigate("/salescarts");
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  };

  React.useEffect(() => {
    if (!selectedProduct) {
      navigate("/");
    }
  }, [selectedProduct]);

  return (
    <>
      {!errors && <Navigate to="/checkout" replace={true} />}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          marginTop: "160px",
        }}
      >
        <Box>
          <Grid container spacing={3}>
            <Grid item lg={6}>
              <Card sx={{ height: "380px", width: "400px" }}>
                <CardMedia
                  component="img"
                  sx={{ height: "400px", width: "auto" }}
                  image="../src/assets/cheese.png"
                  alt="Paella dish"
                />
              </Card>
            </Grid>
            <Grid item lg={6}>
              {" "}
              <Box
                sx={{ height: "380px", width: "600px" }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Typography sx={{ fontSize: "40px" }}>
                  {selectedProduct?.name}
                </Typography>
                <InputField
                  id="quantity"
                  label="quantity"
                  type="number"
                  signup={{
                    ...register("quantity", {
                      required: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a whole number",
                      },
                    }),
                  }}
                  errors={errors.quantity}
                />
                <Typography sx={{ color: "#F94A29", fontSize: "20px" }}>
                  Give quantity as packs!!! 1 pack = 20 single units
                </Typography>
                {errors.quantity?.message && (
                  <Alert severity="error">{errors.quantity?.message}</Alert>
                )}
                {error && (
                  <Alert sx={{ marginTop: "10px" }} severity="error">
                    {error}
                  </Alert>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(155, 207, 83, 0.8)",
                    marginTop: "20px",
                  }}
                >
                  Buy
                </Button>

                <Link to="/">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#DF2E38",
                      marginTop: "20px",
                      marginLeft: "10px",
                      color: "black",
                    }}
                  >
                    Cancel
                  </Button>
                </Link>

                <Typography sx={{ fontSize: "25px", marginTop: "20px" }}>
                  {" "}
                  Unit Price : {selectedProduct?.price} LKR
                </Typography>
                <Typography sx={{ fontSize: "25px", marginTop: "20px" }}>
                  {" "}
                  Price of 1 Pack : {selectedProduct?.price * 20} LKR
                </Typography>
                <Typography sx={{ fontSize: "25px", marginTop: "20px" }}>
                  {" "}
                  Available Quantity : {selectedProduct?.quantity} packs
                </Typography>
                <Typography sx={{ fontSize: "25px", marginTop: "20px" }}>
                  {" "}
                  Manufacture Date :{" "}
                  {selectedProduct?.manufacDtae.substring(0, 10)}
                </Typography>
                <Typography sx={{ fontSize: "25px", marginTop: "20px" }}>
                  {" "}
                  Expiration Date :{" "}
                  {selectedProduct?.expirationDate.substring(0, 10)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "25px",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  More Details
                </Typography>
                <Typography>{selectedProduct?.description}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProductDetails;

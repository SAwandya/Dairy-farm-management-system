import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import usePurcahse from "../../hooks/usePurchase";

const OrderPage = () => {

  const { getCurrentUser } = useAuth();  

  const currentUser = getCurrentUser();

  const { data, isLoading } = usePurcahse(currentUser._id);

  console.log(data);

  return (
    <>
      <Container sx={{ margin: "150px", alignItems: "center" }}>
        {data?.map((purchase) => (
          <Accordion
            sx={{ marginTop: "20px", borderRadius: "16px" }}
            defaultExpanded
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <AccordionSummary
                aria-controls="panel3-content"
                id="panel3-header"
                sx={{ fontSize: "20px" }}
              >
                {" "}
                {purchase.product.name}{" "}
              </AccordionSummary>
              <Typography
                sx={{
                  alignItems: "flex-end",
                  margin: "20px",
                  color: "#16FF00",
                }}
              >
                Processing
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography sx={{ fontSize: "20px", marginLeft: "16px" }}>
                Total : {purchase.product.price}
              </Typography>
              <Typography sx={{ fontSize: "20px", marginLeft: "60px" }}>
                Category : {purchase.product.category}
              </Typography>
              <Typography sx={{ fontSize: "20px", marginLeft: "60px" }}>
                Quantity : {purchase.product.quantity} packs
              </Typography>
              <Typography sx={{ fontSize: "20px", marginLeft: "60px" }}>
                Order Date : {purchase.orderDate}
              </Typography>
            </Box>

            <AccordionDetails>{purchase.product.description}</AccordionDetails>
            <AccordionActions>
              <Button>Cancel</Button>
              <Button>Edit</Button>
            </AccordionActions>
          </Accordion>
        ))}
      </Container>
    </>
  );
};

export default OrderPage;

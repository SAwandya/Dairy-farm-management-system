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
import OrderUpdatePopup from "../../components/Sales/OrderUpdatePopup";

const OrderPage = () => {
  const { getCurrentUser } = useAuth();

  const currentUser = getCurrentUser();

  const [open, openchange] = React.useState(false);

  const [selectedId, setSelecetId] = React.useState(null);

  const [selectedPurchase, setSelectedPurchase] = React.useState(null);

  const { data, isLoading, refetch } = usePurcahse(currentUser._id);

  const functionopenpopup = (id, purchase) => {
    setSelecetId(id);
    setSelectedPurchase(purchase);
    openchange(true);
  };

  return (
    <>
      <Container sx={{ margin: "150px", alignItems: "center" }}>
        {data?.map((purchase) => (
          <React.Fragment key={purchase._id}>
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

              <AccordionDetails>
                {purchase.product.description}
              </AccordionDetails>
              <AccordionActions>
                <Button>Cancel</Button>
                <Button
                  onClick={() => functionopenpopup(purchase._id, purchase)}
                >
                  Edit
                </Button>
              </AccordionActions>
            </Accordion>
          </React.Fragment>
        ))}
      </Container>
      <OrderUpdatePopup
        open={open}
        openchange={openchange}
        purchaseId={selectedId}
        purchase={selectedPurchase}
        refetch={refetch}
      />
    </>
  );
};

export default OrderPage;

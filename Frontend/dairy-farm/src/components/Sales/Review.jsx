import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

const Review = (props) => {
  const { processData, selectedProduct } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={processData.name}
            secondary={processData.category}
          />
          <Typography variant="body2"></Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Quantity" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {selectedProduct.quantity} Packs
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {selectedProduct.quantity * 20 * processData.price} LKR
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Dilevery details
          </Typography>
          <Typography gutterBottom>
            {selectedProduct.firstName} {selectedProduct.lastName}
          </Typography>
          <Typography gutterBottom>
            {selectedProduct.address1}, {selectedProduct.address2}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>{selectedProduct.cardName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {selectedProduct.cardNumber}
                </Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;

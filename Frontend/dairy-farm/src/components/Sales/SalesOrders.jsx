import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SalesTitle from "./SalesTitle";
import usePurcahse from "../../hooks/usePurcahses";
import purchaseService from "../../services/Sales/purchaseService";
import { Box, Button, Container } from "@mui/material";
import Popup from "./Popup";
import Search from "./Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const SalesOrders = () => {
  const { data, error, isLoading, refetch } = usePurcahse();

  const [open, openchange] = React.useState(false);

  const [selectedDeleteId, setSelecetdDeleteId] = React.useState(null);

  const [buttonLoadingId, setButtonLoadingId] = React.useState(null);

  const functionopenpopup = (id) => {
    setSelecetdDeleteId(id);
    openchange(true);
  };

  const handleApprove = (id, approve) => {
    setButtonLoadingId(id);
    const data = { approve: approve };
    purchaseService
      .Approve(id, data)
      .then((res) => {
        setButtonLoadingId(null);
        refetch();
        if (approve == true) {
          toast.success("Order approved successfully");
        } else {
          toast.success("Order rejected successfully");
        }
        toast("sent email to the customer successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [query, setQuery] = React.useState("");

  const keys = ["quantity", "product"];

  const search = (data) => {
    const matches = [];

    data?.forEach((item) => {
      const productName = item.product?.name?.toLowerCase();
      const customerName = item.customer?.name?.toLowerCase();

      if (productName && productName.includes(query.toLowerCase())) {
        matches.push(item);
      } else if (customerName && customerName.includes(query.toLowerCase())) {
        matches.push(item);
      }
    });

    return matches;
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <SalesTitle>Recent Orders</SalesTitle>

        <Search setQuery={setQuery} query={query} />
      </Container>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity(Units)</TableCell>
            <TableCell>Customer name</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
            <TableCell>Approve</TableCell>
            <TableCell>Cancel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {search(data)?.map((purchase) => (
            <TableRow key={purchase._id}>
              <TableCell>{purchase.product.name}</TableCell>
              <TableCell>{purchase.quantity}</TableCell>
              <TableCell>{purchase.customer.name}</TableCell>
              <TableCell align="right">
                {`${purchase.product.price * purchase.quantity * 20} LKR`}
              </TableCell>
              <TableCell>
                {!purchase.approve ? (
                  <Box>
                    <LoadingButton
                      color="success"
                      loading={buttonLoadingId == purchase._id}
                      onClick={() => handleApprove(purchase._id, true)}
                      loadingPosition="start"
                      variant="contained"
                      startIcon={<SaveIcon />}
                    >
                      <span>Approve</span>
                    </LoadingButton>
                  </Box>
                ) : (
                  <LoadingButton
                    color="error"
                    loading={buttonLoadingId == purchase._id}
                    onClick={() => handleApprove(purchase._id, false)}
                    loadingPosition="start"
                    variant="outlined"
                    startIcon={<SaveIcon />}
                  >
                    <span>Reject</span>
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => functionopenpopup(purchase._id)}
                  variant="outlined"
                  disabled={purchase.approve == true ? true : false}
                  size="medium"
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more orders
      </Link>

      <Popup
        open={open}
        openchange={openchange}
        purchaseId={selectedDeleteId}
        refetch={refetch}
      />
    </React.Fragment>
  );
};

export default SalesOrders;

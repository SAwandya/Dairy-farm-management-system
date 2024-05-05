import React from "react";
import useBatch from "../../hooks/useBatch";
import { ToastContainer, toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SalesTitle from "./SalesTitle";
import usePurcahse from "../../hooks/usePurcahses";
import Button from "@mui/material/Button";
import useProducts from "../../hooks/useProducts";
import useGameQueryStore from "../../store";
import { Link } from "react-router-dom";
import publishService from "../../services/Sales/publishService";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import productService from "../../services/Sales/productService";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "./Search";
import { Container } from "@mui/material";
import Swal from "sweetalert2";

const ReleasedBatches = () => {
  const { data, isLoading, refetch } = useBatch();

  const [query, setQuery] = React.useState("");

  const keys = ["name", "variant"];

  const search = (data) => {
    return data?.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const handleSubmit = (batch) => {

    Swal.fire({
      title: "Are you want to add this product batch to inventory?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Added!",
          text: "Product batch has been added",
          icon: "success",
        });

         productService
           .Add(batch)
           .then((res) => {
             console.log(res);
             refetch()
           })
           .catch((err) => {
             console.log(err);
           });
      }
    });

   
  }

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
        <SalesTitle>Released Product Batches</SalesTitle>

        <Search setQuery={setQuery} query={query} />
      </Container>

      <Table size="small" width="200px">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>variant</TableCell>
            <TableCell >Manufacture Date</TableCell>
            <TableCell>Expire Date</TableCell>
            <TableCell>Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {search(data)?.map((batch) => (
            <TableRow key={batch._id}>
              <TableCell>{batch.name}</TableCell>
              <TableCell>{batch.quantity}</TableCell>
              <TableCell>{batch.variant}</TableCell>
              <TableCell >
                {batch.manufactureDate.substring(0, 10)}
              </TableCell>
              <TableCell >
                {batch.expiryDate.substring(0, 10)}
              </TableCell>

              <TableCell>
                  <Button
                    onClick={() => handleSubmit(batch)}
                    variant="contained"
                    size="medium"
                    color="success"
                  >
                    Add
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading ? (
        <Box sx={{ width: 1100 }}>
          <Skeleton sx={{ height: 80, marginTop: -1 }} />
          <Skeleton sx={{ height: 80, marginTop: -3 }} animation="wave" />
          <Skeleton sx={{ height: 80, marginTop: -3 }} animation="wave" />
          <Skeleton sx={{ height: 80, marginTop: -3 }} animation={false} />
          <Skeleton sx={{ height: 80, marginTop: -3 }} animation={false} />
        </Box>
      ) : null}
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default ReleasedBatches;

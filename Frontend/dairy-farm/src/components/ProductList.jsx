import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SalesTitle from "./SalesTitle";
import usePurcahse from "../hooks/usePurcahse";
import Button from "@mui/material/Button";
import useProducts from "../hooks/useProducts";
import useGameQueryStore from "../store";
import { Link } from "react-router-dom";
import publishService from "../services/publishService";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import productService from "../services/productService";
import DeleteIcon from "@mui/icons-material/Delete";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const ProductList = () => {
  const { data, error, isLoading, refetch } = useProducts();

  const SetSelectedProductUpdate = useGameQueryStore(
    (s) => s.SetSelectedProductUpdate
  );

  const SetSelectedProductPublish = useGameQueryStore(
    (s) => s.SetSelectedProductPublish
  );

  console.log(data);

  const handleUpdate = (id) => {
    SetSelectedProductUpdate(id);
  };

  const handlePublish = (id, publish) => {
    const data = { publish: publish };

    publishService
      .Publish(id, data)
      .then((res) => {
        console.log(res.data);
        console.log("success");
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDelete = (id) => {
    productService
      .Delete(id)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <React.Fragment>
      <SalesTitle>Recent Products</SalesTitle>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Publish</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell align="right">{`$${product.price}`}</TableCell>
              <TableCell>
                <Link to="/productupdate">
                  <Button
                    onClick={() => handleUpdate(product._id)}
                    variant="contained"
                    size="medium"
                    color="success"
                  >
                    Update
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                {product.publish == false ? (
                  <Button
                    onClick={() => handlePublish(product._id, true)}
                    variant="outlined"
                    size="medium"
                    color="error"
                  >
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePublish(product._id, false)}
                    variant="outlined"
                    size="medium"
                    color="error"
                  >
                    Publish
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(product._id)}
                  variant="outlined"
                  size="medium"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
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
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default ProductList;

import * as React from "react";
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
import { ToastContainer, toast } from "react-toastify";

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

  const handleUpdate = (product) => {
    SetSelectedProductUpdate(product);
  };

  const handlePublish = (id, publish) => {
    const data = { publish: publish };

    publishService
      .Publish(id, data)
      .then((res) => {
        console.log(res.data);
        console.log("success");
        toast.success("successfull");

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
        toast.error("Successfully deleted");

        refetch();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [query, setQuery] = React.useState("");

  const keys = ["name", "category"];

  const search = (data) => {
    return data?.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
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
        <SalesTitle>Recent Products</SalesTitle>

        <Search setQuery={setQuery} query={query} />
      </Container>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity(Packs)</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Publish</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {search(data)?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell align="right">{`${product.price} LKR`}</TableCell>
              <TableCell>
                <Link to="/productupdate">
                  <Button
                    onClick={() => handleUpdate(product)}
                    variant="contained"
                    size="medium"
                    color="success"
                  >
                    Update
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                {product.publish == true ? (
                  <Button
                    onClick={() => handlePublish(product._id, false)}
                    variant="outlined"
                    size="medium"
                    color="error"
                  >
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePublish(product._id, true)}
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

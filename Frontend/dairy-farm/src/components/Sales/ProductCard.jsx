import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";
import useGameQueryStore from "../../store";

const ProductCard = (props) => {
  const { product } = props;

  const SetSelectedProduct = useGameQueryStore((s) => s.SetSelectedProduct);

  const handleSubmit = (event) => {
    console.log("submited");

    SetSelectedProduct(product);
  };

  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg", borderRadius: "20px" }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
            srcSet="../src/assets/cheese.png"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        
        <Typography sx={{ fontSize: "20px" }}>{product.name}</Typography>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl" }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              Lowest price
            </Chip>
          }
        >
          {product.price} LKR
        </Typography>
        <Typography level="body-sm">
          (Only <b>7</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Link to="/productdetails">
          <Button
            onClick={(event) => handleSubmit(event)}
            type="submit"
            variant="solid"
            color="danger"
            size="lg"
          >
            Buy
          </Button>
        </Link>
      </CardOverflow>
    </Card>
  );
};

export default ProductCard;

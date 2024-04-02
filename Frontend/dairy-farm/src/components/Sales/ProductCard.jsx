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
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
        boxShadow: "lg",
        borderRadius: "20px",
        height: "376px",
      }}
    >
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
            loading="lazy"
            srcSet="../src/assets/cheese.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography sx={{ fontSize: "28px", fontWeight: "2px" }}>
          {product.name}
        </Typography>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl", fontSize:'22px' }}
          endDecorator={
            <Chip component="span" size="lg" variant="soft" color="success">
              1 PACK = 20 Units
            </Chip>
          }
        >
          {product.price * 20} LKR
        </Typography>
        <Typography level="body-sm" sx={{ fontSize: "18px", marginTop: "5px" }}>
          ( <b>{product.quantity} Packs</b> Available in stock)
        </Typography>
      </CardContent>
      <CardOverflow
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Link to="/productdetails">
          <Button
            onClick={(event) => handleSubmit(event)}
            type="submit"
            variant="solid"
            color="danger"
            size="lg"
            sx={{
              width: "140px",
              borderRadius: "0 0 0 10px",
              marginBottom: "8px",
            }}
          >
            Buy
          </Button>
          <Button
            onClick={(event) => handleSubmit(event)}
            type="submit"
            variant="solid"
            color="success"
            size="lg"
            sx={{
              width: "140px",
              marginLeft: "5px",
              borderRadius: "0 0 10px 0",
              marginBottom: "8px",
            }}
          >
            Add to cart
          </Button>
        </Link>
      </CardOverflow>
    </Card>
  );
};

export default ProductCard;

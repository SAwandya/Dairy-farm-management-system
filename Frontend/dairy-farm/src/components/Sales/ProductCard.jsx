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

  const SetselectedBuyAddButton = useGameQueryStore((s) => s.SetselectedBuyAddButton);

  const handleSubmit = (event, button) => {
    console.log("submited");

    SetselectedBuyAddButton(button);

    SetSelectedProduct(product);
  };

  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
        boxShadow: "lg",
        borderRadius: "20px",
        height: "400px",
        marginTop: "20px"
      }}
    >
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            // src={product.category == 'Cheese' ? "https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286" }
            loading="lazy"
            srcSet={
              product.category == "Cheese"
                ? "../src/assets/cheese.jpg"
                : product.category == "Ice_cream"
                ? "../src/assets/ice_cream.jpg"
                : "../src/assets/yo_gurt.png"
            }
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
        <Typography sx={{ fontSize: "18px", fontWeight: "2px" }}>
          {product.unitOfMeasurement}
        </Typography>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl", fontSize: "22px" }}
          endDecorator={
            <Chip component="span" size="lg" variant="soft" color="success">
              1 PACK = 20 Units
            </Chip>
          }
        >
          {product.price * 20} LKR
        </Typography>
        <Typography level="body-sm" sx={{ fontSize: "18px", marginTop: "5px" }}>
          ( <b>{Math.floor(product.quantity)} Packs</b> Available in stock)
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
            onClick={(event, buy) => handleSubmit(event, "buy")}
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
            onClick={(event, add) => handleSubmit(event, "add")}
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

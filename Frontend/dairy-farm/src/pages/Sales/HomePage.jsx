import React from "react";
import ProductGrid from "../../components/Sales/ProductGrid";
import { Box, Typography } from "@mui/material";
import MessagePop from "../../components/Sales/MessagePop";
import useGameQueryStore from "../../store";
import NotificationListPop from "../../components/Sales/NotificationListPop";

const HomePage = () => {

  const openNotify = useGameQueryStore((s) => s.openNotify);

  console.log(openNotify);

  const SetOpenNotify = useGameQueryStore((s) => s.SetOpenNotify);

  const handleOpenNotify = () => {
    
  }

  return (
    <>
      <Box
        sx={{
          backgroundImage: "url(../src/assets/mainbgw.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      ></Box>
      <Typography
        sx={{
          fontSize: "40px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        PRODUCTS
      </Typography>
      <ProductGrid />
      <Box
        sx={{
          height: "40vh",
          backgroundColor: "#114232",
          marginTop: "40px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "40px",
            marginRight: "20px",
          }}
        >
          <Box>
            <Typography
              fontFamily="serif"
              fontSize={35}
              fontWeight={10}
              color="#87A922"
            >
              On the Farm
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Meet Our Farmers
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Meet the Cows
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Famous Dairy Facts
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              From the Farm to the Fridge
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Dairy Farm Map
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Farm Practices
            </Typography>
          </Box>
          <Box>
            <Typography
              fontFamily="serif"
              fontSize={35}
              fontWeight={10}
              color="#87A922"
            >
              In the Kitchen
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Recipes
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Lactose Intolerance
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Milk Imitators
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Organic Milk
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Flavored Milk
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Ask Our Dietitian
            </Typography>
          </Box>
          <Box>
            <Typography
              fontFamily="serif"
              fontSize={35}
              fontWeight={10}
              color="#87A922"
            >
              About Us
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              FAQ
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Our Board
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Our Staff
            </Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            ></Typography>
            <Typography
              fontFamily="serif"
              sx={{ marginLeft: "10px" }}
              color="#E8EFCF"
              fontSize={18}
            >
              Contact Us
            </Typography>
          </Box>
        </Box>
      </Box>
      <NotificationListPop
        opennotify={openNotify}
        setOpennotify={SetOpenNotify}
        //refetch={refetch}
        handlefunction={handleOpenNotify}
      />
    </>
  );
};

export default HomePage;

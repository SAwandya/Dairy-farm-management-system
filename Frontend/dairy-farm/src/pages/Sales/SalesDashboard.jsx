import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MainListItems from "../../components/Sales/MainListItems";
import SalesDeposits from "../../components/Sales/SalesDeposits";
import SalesOrders from "../../components/Sales/SalesOrders";
import ProductList from "../../components/Sales/ProductList";
import CustomerList from "../../components/Sales/CustomerList";
import SalesChart2 from "../../components/Sales/SalesChart2";
import BgCard from "../../components/Sales/bgCard";
import useProducts from "../../hooks/useProducts";
import DateV from "../../components/Sales/DateV";
import Name from "../../components/Sales/Name";
import { useNavigate } from "react-router-dom";
import SalesProfile from "./SalesProfile";
import ReleasedBatches from "../../components/Sales/ReleasedBatches";

const drawerWidth = 130;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflow: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

const SalesDashboard = () => {
  const { data, error, isLoading, refetch } = useProducts();

  const navigate = useNavigate();

  const publishPro = data?.filter((value) => value.publish === false);
  const unpublishPro = data?.filter((value) => value.publish === true);

  const publishlen = publishPro?.length || 0;

  const unpublishlen = unpublishPro?.length || 0;

  const allProduct = data?.length || 0;

  const [selected, setSeleceted] = React.useState("product");

  const handleClick = (select) => {
    if (select == "order") {
      setSeleceted("order");
    } else if (select == "report") {
      setSeleceted("report");
    } else if (select == "deposit") {
      setSeleceted("deposit");
    } else if (select == "product") {
      setSeleceted("product");
    } else if (select == "customer") {
      setSeleceted("customer");
    } else if (select == "logout") {
      navigate("/homeM");
    } else if (select == "profile") {
      setSeleceted("profile");
    } else if (select == "batch") {
      setSeleceted("batch");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />

        <Drawer
          variant="permanent"
          open={open}
          sx={{
            backgroundColor: "#38775B",
            position: "fixed",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [5],
              borderRadius: "0 30px 0 0",
              backgroundColor: "#38775B",
              width: "130px",
            }}
          >
            <Box sx={{ marginRight: "-28px", marginTop: "7px" }}>
              <img
                className="sidebar-logo"
                src="../../src/assets/sidebar-logo.png"
                alt="Logo"
              />
            </Box>
          </Toolbar>

          <List
            component="nav"
            sx={{
              backgroundColor: "#38775B",
              height: "92vh",
              borderRadius: "0 0 30px 0",
              width: "130px",
              position: "fixed",
              top: "60px",
              left: "0",
            }}
          >
            <MainListItems onSelect={handleClick} selectedTab={selected} />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            width: "100vw",
          }}
        >
          <Box sx={{ margin: "70px" }}>
            <DateV />
          </Box>
          <Box sx={{ marginLeft: "200px", marginTop: "-130px" }}>
            <Name />
          </Box>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                {selected == "report" ? (
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: 790,
                      width: 1160,
                      padding: "30px",
                      marginLeft: "64px",
                      marginTop: "20px",
                      borderRadius: "20PX",
                    }}
                  >
                    <SalesChart2 />
                  </Paper>
                ) : null}
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                {selected == "deposit" ? (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                      margin: "50px",
                    }}
                  >
                    <SalesDeposits />
                  </Paper>
                ) : null}
              </Grid>

              <Grid sx={{ marginLeft: "120px" }} item xs={12}>
                {selected == "order" ? (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <SalesOrders />
                  </Paper>
                ) : null}
              </Grid>
            </Grid>

            <Grid sx={{ marginLeft: "120px" }} item xs={12}>
              {selected == "product" ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: "40px",
                    }}
                  >
                    <BgCard data={allProduct} text="Total number of products" />
                    <BgCard data={publishlen} text="Published products" />
                    <BgCard data={unpublishlen} text="Unpublished products" />
                  </Box>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "20px",
                    }}
                  >
                    <ProductList />
                  </Paper>
                </>
              ) : null}
            </Grid>

            <Grid sx={{ marginLeft: "50px" }} item xs={12}>
              {selected == "customer" ? (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    width: "160vh",
                  }}
                >
                  <CustomerList />
                </Paper>
              ) : null}
            </Grid>
            <Grid sx={{ marginLeft: "50px" }} item xs={12}>
              {selected == "batch" ? (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    width: "160vh",
                  }}
                >
                  <ReleasedBatches />
                </Paper>
              ) : null}
            </Grid>

            <Grid sx={{ marginLeft: "50px" }} item xs={12}>
              {selected == "profile" ? <SalesProfile /> : null}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SalesDashboard;

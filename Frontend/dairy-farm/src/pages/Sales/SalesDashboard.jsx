import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecondaryListItems from "../../components/Sales/SecondaryListItems";
import MainListItems from "../../components/Sales/MainListItems";
import SalesChart from "../../components/Sales/SalesChart";
import SalesDeposits from "../../components/Sales/SalesDeposits";
import SalesOrders from "../../components/Sales/SalesOrders";
import ProductList from "../../components/Sales/ProductList";
import CustomerList from "../../components/Sales/CustomerList";
import SalesChart2 from "../../components/Sales/SalesChart2";
import SalesChart3 from "../../components/Sales/SalesCharts";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

const drawerWidth = 130;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
      overflowX: "hidden",
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#5dbea3",
    },
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const SalesDashboard = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
        <AppBar
          position="absolute"
          open={open}
          sx={{
            background: "url(../src/assets/background.png)",
            backgroundColor: "#D2EBE6",
            backgroundSize: "cover",
          }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h2"
              variant="h6"
              color="#191A19"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Sales Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: "#38775B" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [5],
              borderRadius: "0 40px 0 0",
              backgroundColor: "#38775B",
              width: "130px",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          {/* <Divider /> */}
          <List
            component="nav"
            sx={{
              backgroundColor: "#38775B",
              height: "92vh",
              borderRadius: "0 0 50px 0",
              width: "130px",
            }}
          >
            <MainListItems onSelect={handleClick} selectedTab={selected} />
            {/* <Divider sx={{ my: 1 }} /> */}
            <SecondaryListItems />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === "light"
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            background: "url(../src/assets/background.png)",
            backgroundColor: "#D2EBE6",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            flexGrow: 1,
            height: "100vh",
            width: "100vw",
            overflow: "auto",
          }}
        >
          <Toolbar sx={{ backgroundColor: "#38775B" }} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}

              <Grid item xs={12} md={8} lg={9}>
                {selected == "report" ? (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 600,
                      width: 1200,
                      background: "#114232",
                      padding: '60px'
                    }}
                  >
                    <SalesChart2 />
                  </Paper>
                ) : null}
              </Grid>

              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                {selected == "deposit" ? (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <SalesDeposits />
                  </Paper>
                ) : null}
              </Grid>

              {/* Recent Orders */}
              <Grid item xs={12}>
                {selected == "order" ? (
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <SalesOrders />
                  </Paper>
                ) : null}
              </Grid>
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12}>
              {selected == "product" ? (
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <ProductList />
                </Paper>
              ) : null}
            </Grid>

            {/* Customer List */}
            <Grid item xs={12}>
              {selected == "customer" ? (
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <CustomerList />
                </Paper>
              ) : null}
            </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SalesDashboard;

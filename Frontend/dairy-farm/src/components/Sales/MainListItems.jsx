import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Box, Container } from "@mui/material";

const MainListItems = (props) => {
  const { onSelect, selectedTab } = props;

  return (
    <React.Fragment>
      <Box sx={{ marginLeft: "10px" }}>
        <ListItemButton
          sx={{
            height: "60px",
            width: "106px",
            marginTop: "24px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: selectedTab === "product" ? "#4FFFB0" : null,
          }}
          onClick={() => onSelect("product")}
        >
          <ListItemIcon
            sx={{
              marginTop: "8px",
              color: selectedTab === "product" ? "black" : "white",
            }}
          >
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{ color: selectedTab === "product" ? "black" : "white" }}
          />
        </ListItemButton>

        <ListItemButton
          sx={{
            height: "60px",
            width: "106px",
            marginTop: "24px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: selectedTab === "order" ? "#4FFFB0" : null,
          }}
          onClick={() => onSelect("order")}
        >
          <ListItemIcon
            sx={{
              marginTop: "8px",
              color: selectedTab === "order" ? "black" : "white",
            }}
          >
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText
            primary="Orders"
            sx={{ color: selectedTab === "order" ? "black" : "white" }}
          />
        </ListItemButton>

        <ListItemButton
          sx={{
            height: "60px",
            width: "106px",
            marginTop: "24px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: selectedTab === "customer" ? "#4FFFB0" : null,
          }}
          onClick={() => onSelect("customer")}
        >
          <ListItemIcon
            sx={{
              marginTop: "8px",
              color: selectedTab === "customer" ? "black" : "white",
            }}
          >
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Customers"
            sx={{ color: selectedTab === "customer" ? "black" : "white" }}
          />
        </ListItemButton>

        <ListItemButton
          sx={{
            height: "60px",
            width: "106px",
            borderRadius: "20px",
            display: "flex",
            marginTop: "24px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: selectedTab === "report" ? "#4FFFB0" : null,
          }}
          onClick={() => onSelect("report")}
        >
          <ListItemIcon
            sx={{
              marginTop: "8px",
              color: selectedTab === "report" ? "black" : "white",
            }}
          >
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText
            primary="Reports"
            sx={{ color: selectedTab === "report" ? "black" : "white" }}
          />
        </ListItemButton>
      </Box>
    </React.Fragment>
  );
};

export default MainListItems;

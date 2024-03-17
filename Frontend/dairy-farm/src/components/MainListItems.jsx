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
      <ListItemButton
        sx={{
          backgroundColor: "#4FFFB0",
          height: "60px",
          width: "106px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: selectedTab === "product" ? "#4FFFB0" : null,
        }}
        onClick={() => onSelect("product")}
      >
        <ListItemIcon sx={{ marginLeft: "30px", marginTop: "8px" }}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton
        sx={{
          backgroundColor: "#4FFFB0",
          height: "60px",
          width: "106px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: selectedTab === "order" ? "#4FFFB0" : null,
        }}
        onClick={() => onSelect("order")}
      >
        <ListItemIcon sx={{ marginLeft: "30px", marginTop: "8px" }}>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>

      <ListItemButton
        sx={{
          backgroundColor: "#4FFFB0",
          height: "60px",
          width: "106px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: selectedTab === "customer" ? "#4FFFB0" : null,
        }}
        onClick={() => onSelect("customer")}
      >
        <ListItemIcon sx={{ marginLeft: "30px", marginTop: "8px" }}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>

      <ListItemButton
        sx={{
          backgroundColor: "#4FFFB0",
          height: "60px",
          width: "106px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: selectedTab === "report" ? "#4FFFB0" : null,
        }}
        onClick={() => onSelect("report")}
      >
        <ListItemIcon sx={{ marginLeft: "30px", marginTop: "8px" }}>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;

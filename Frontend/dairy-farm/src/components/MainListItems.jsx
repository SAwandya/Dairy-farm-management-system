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

const MainListItems = (props) => {
  const { onSelect, selectedTab } = props;

  return (
    <React.Fragment>
      <ListItemButton
        sx={{ backgroundColor: selectedTab === "product" ? "#4FFFB0" : null }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" onClick={() => onSelect("product")} />
      </ListItemButton>
      <ListItemButton
        sx={{ backgroundColor: selectedTab === "order" ? "#4FFFB0" : null }}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" onClick={() => onSelect("order")} />
      </ListItemButton>
      <ListItemButton
        sx={{ backgroundColor: selectedTab === "customer" ? "#4FFFB0" : null }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText
          primary="Customers"
          onClick={() => onSelect("customer")}
        />
      </ListItemButton>
      <ListItemButton
        sx={{ backgroundColor: selectedTab === "report" ? "#4FFFB0" : null }}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" onClick={() => onSelect("report")} />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;

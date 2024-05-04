import React, { useState } from "react";
import NavigationLink from "../NavigationLink";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import BallotIcon from '@mui/icons-material/Ballot';

function Sidebar() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleNavigation = (section) => {
    setActiveSection(section);
  };
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };


  return (
    <Box className="sidebar" sx={{position:'fixed',left:0,top:0}}>
      <Box className="sidebar-logo-container" >
        <img
          className="sidebar-logo"
          src="../../src/assets/sidebar-logo.png"
          alt="Logo"
        />
      </Box>

      {/* Navigation links */}
      <Box className="navigation-links">
        <List>

        <Link to="/inventory" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<SpaceDashboardIcon />}
              text="Dashboard"
              isActive={isActive("/inventory")}
            />
          </Link>

          <Link to="/supplierdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<LocalShippingIcon />}
              text="Supplier"
              isActive={isActive("/supplierdashboard")}
            />
          </Link>
          <Link to="/order" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<InventoryIcon />}
              text="Orders"
              isActive={isActive("/order")}
            />
          </Link>
          <Link to="/item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<BallotIcon />}
              text="Items"
              isActive={isActive("/item")}
            />
          </Link>
          <Link to="/reportOrder" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AssessmentIcon />}
              text="Reports"
              isActive={isActive("/reportOrder")}
            />
          </Link>
        </List>
      </Box>

      <Box className="user-actions">
        <List>
          <Link to="/supProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AccountCircleIcon />}
              text="Profile"
              isActive={isActive("/supProfile")}
            />
          </Link>
          <Link to="/homeM" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<LogoutIcon />}
              text="Logout"
              isActive={isActive("/homeM")}
            />
          </Link>
        </List>
      </Box>
    </Box>
  );
}


export default Sidebar;

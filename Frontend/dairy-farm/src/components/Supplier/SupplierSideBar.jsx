import React, { useState } from "react";
import NavigationLink from "../NavigationLink";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import BallotIcon from '@mui/icons-material/Ballot';

function Sidebar() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <Box className="sidebar">
      <Box className="sidebar-logo-container">
        <img
          className="sidebar-logo"
          src="../../src/assets/sidebar-logo.png"
          alt="Logo"
        />
      </Box>

      {/* Navigation links */}
      <Box className="navigation-links">
        <List>

        <Link
            to="/inventory"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
          <NavigationLink
            icon={<SpaceDashboardIcon />}
            text="Dashboard"
            isActive={activeSection === "dashboard"}
            onClick={() => handleNavigation("dashboard")}
          />
        </Link>

        <Link
            to="/supplierdashboard"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
          <NavigationLink
            icon={<LocalShippingIcon />}
            text="Supplier"
            isActive={activeSection === "supplier"}
            onClick={() => handleNavigation("supplier")}
          />
        </Link>
        <Link
            to="/order"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
          <NavigationLink
            icon={<InventoryIcon />}
            text="Orders"
            isActive={activeSection === "orders"}
            onClick={() => handleNavigation("orders")}
          />
        </Link>
        <Link
            to="/item"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
          <NavigationLink
            icon={<BallotIcon />}
            text="Items"
            isActive={activeSection === "items"}
            onClick={() => handleNavigation("items")}
          />
        </Link>
        <Link
            to="/reportOrder"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
          <NavigationLink
            icon={<AssessmentIcon />}
            text="Reports"
            isActive={activeSection === "reports"}
            onClick={() => handleNavigation("reports")}
          />
        </Link>
        </List>
      </Box>
      <Box className="user-actions">
        <List>
          <NavigationLink
            icon={<AccountCircleIcon />}
            text="Profile"
            isActive={activeSection === "profile"}
            onClick={() => handleNavigation("profile")}
          />
          <NavigationLink
            icon={<LogoutIcon />}
            text="Logout"
            isActive={activeSection === "logout"}
            onClick={() => handleNavigation("logout")}
          />
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;

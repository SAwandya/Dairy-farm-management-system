import React, { useState } from "react";
import NavigationLink from "../NavigationLink";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

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
    <Box className="sidebar" sx={{ position: 'fixed', left: 0, top: 0 }}>
      <Box className="sidebar-logo-container">
        <Link to="/homeM" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            className="sidebar-logo"
            src="../../src/assets/sidebar-logo.png"
            alt="Logo"
          />
        </Link>
      </Box>

      {/* Navigation links */}
      <Box className="navigation-links">
        <List>
          <Link to="/milkingdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<SpaceDashboardIcon />}
              text="Dashboard"
              isActive={isActive("/milkingdashboard")}
            />
          </Link>
          <Link to="/milkingSessions" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AccessTimeFilledIcon />}
              text="Sessions"
              isActive={isActive("/milkingSessions")}
            />
          </Link>
          <Link to="/milkingData" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<DonutSmallIcon />}
              text="Data"
              isActive={isActive("/milkingData")}
            />
          </Link>
          <Link to="/milkingStorage" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<WaterDropIcon />}
              text="Storage"
              isActive={isActive("/milkingStorage")}
            />
          </Link>
          <Link to="/milkingReport" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AssessmentIcon />}
              text="Reports"
              isActive={isActive("/milkingReport")}
            />
          </Link>
        </List>
      </Box>

      {/* Profile and Logout */}
      <Box className="user-actions">
        <List>
          <Link to="/milkingProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AccountCircleIcon />}
              text="Profile"
              isActive={isActive("/milkingProfile")}
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

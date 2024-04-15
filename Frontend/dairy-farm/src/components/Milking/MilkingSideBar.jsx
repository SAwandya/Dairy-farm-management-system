import React, { useState } from "react";
import NavigationLink from "../NavigationLink";
import { Link } from "react-router-dom";
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

  return (
    <Box className="sidebar" sx={{ position: 'fixed', left: 0, top: 0 }}>
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
          <Link to="/milkingdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<SpaceDashboardIcon />}
              text="Dashboard"
              isActive={activeSection === "dashboard"}
              onClick={() => handleNavigation("dashboard")}
            />
          </Link>
          <Link to="/milkingSessions" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AccessTimeFilledIcon />}
              text="Sessions"
              isActive={activeSection === "sessions"}
              onClick={() => handleNavigation("sessions")}
            />
          </Link>
          <Link to="/milkingData" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<DonutSmallIcon />}
              text="Data"
              isActive={activeSection === "milking-data"}
              onClick={() => handleNavigation("milking-data")}
            />
          </Link>
          <Link to="/milkingStorage" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<WaterDropIcon />}
              text="Storage"
              isActive={activeSection === "storage"}
              onClick={() => handleNavigation("storage")}
            />
          </Link>
          <Link to="/milkingReport" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AssessmentIcon />}
              text="Reports"
              isActive={activeSection === "reports"}
              onClick={() => handleNavigation("reports")}
            />
          </Link>
        </List>
      </Box>

      {/* Profile and Logout */}
      <Box className="user-actions">
        <List>
          <Link to="/milkingdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AccountCircleIcon />}
              text="Profile"
              isActive={activeSection === "profile"}
              onClick={() => handleNavigation("profile")}
            />
          </Link>
          <Link to="/milkingdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<LogoutIcon />}
              text="Logout"
              isActive={activeSection === "logout"}
              onClick={() => handleNavigation("logout")}
            />
          </Link>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;

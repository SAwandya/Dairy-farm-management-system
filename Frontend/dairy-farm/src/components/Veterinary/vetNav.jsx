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
  const [activeSection, setActiveSection] = useState("");


  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <Box className="sidebar" sx={{position:'fixed',left:0,top:0}}>
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
        <Link to="/vetdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<SpaceDashboardIcon />}
            text="Dashboard"
            isActive={activeSection === "vetdashboard"}
            onClick={() => handleNavigation("vetdashboard")}
          />
          </Link>
          <Link to="/animalReg" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AccessTimeFilledIcon />}
              text="Registry"
              isActive={activeSection === "registry"}
              onClick={() => handleNavigation("registry")}
            />
          </Link>
          <Link to="/health" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<DonutSmallIcon />}
            text="Health"
            isActive={activeSection === "health"}
            onClick={() => handleNavigation("health")}
          />
          </Link>
          <NavigationLink
            icon={<WaterDropIcon />}
            text="Breeding"
            isActive={activeSection === "breeding"}
            onClick={() => handleNavigation("breeding")}
          />
          <NavigationLink
            icon={<AssessmentIcon />}
            text="Reports"
            isActive={activeSection === "vetreports"}
            onClick={() => handleNavigation("vetreports")}
          />
        </List>
      </Box>

      {/* Profile and Logout */}
      <Box className="user-actions">
        <List>
          <NavigationLink
            icon={<AccountCircleIcon />}
            text="Profile"
            isActive={activeSection === "vetprofile"}
            onClick={() => handleNavigation("vetprofile")}
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

import React, { useState } from "react";
import NavigationLink from "../NavigationLink";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  const [activeSection, setActiveSection] = useState("vetdashboard");


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
              icon={<AppRegistrationTwoToneIcon/>}
              text="Registry"
              isActive={activeSection === "registry"}
              onClick={() => handleNavigation("registry")}
            />
          </Link>
          <Link to="/health" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<MedicalInformationIcon />}
            text="Health"
            isActive={activeSection === "health"}
            onClick={() => handleNavigation("health")}
          />
          </Link>
          <Link to="/breedAnim" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<Diversity2Icon/>}
            text="Breeding"
            isActive={activeSection === "breeding"}
            onClick={() => handleNavigation("breeding")}
          />
          </Link>
          <Link to="/VetReport" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<AssessmentIcon />}
            text="Reports"
            isActive={activeSection === "vetreports"}
            onClick={() => handleNavigation("vetreports")}
          />
          </Link>
        </List>
      </Box>

      
      <Box className="user-actions">
        <List>
        <Link to="/vetProf" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<AccountCircleIcon />}
            text="Profile"
            isActive={activeSection === "vetprofile"}
            onClick={() => handleNavigation("vetprofile")}
          />
          </Link>
          <Link to="/homeM" style={{ textDecoration: 'none', color: 'inherit' }}>
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

import React, { useState } from "react";
import NavigationLink from "../NavigationLink";
import { Link,useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
 


  
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
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
            isActive={isActive("/vetdashboard")}
          />
          </Link>
          <Link to="/animalReg" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AppRegistrationTwoToneIcon/>}
              text="Registry"
              isActive={isActive("/animalReg")}
            />
          </Link>
          <Link to="/health" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<MedicalInformationIcon />}
            text="Health"
            isActive={isActive("/health")}
          />
          </Link>
          <Link to="/breedAnim" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<Diversity2Icon/>}
            text="Breeding"
            isActive={isActive("/breedAnim")}
          />
          </Link>
          <Link to="/VetReport" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<AssessmentIcon />}
            text="Reports"
            isActive={isActive("/VetReport")}
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
            isActive={isActive("/vetProf")}
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

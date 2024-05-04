import React, { useState } from "react";
import NavigationLink from "../NavigationLink";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import RecyclingIcon from '@mui/icons-material/Recycling';
import ScreenRotationAltIcon from '@mui/icons-material/ScreenRotationAlt';
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import GrassIcon from '@mui/icons-material/Grass';

  function Sidebar() {
    const [activeSection, setActiveSection] = useState("dashboard");

    const handleNavigation = (section) => {
      setActiveSection(section);
    };

    return (
      <Box style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: '240px',  }}>
        <Box className="sidebar">
          <Box className="sidebar-logo-container">
            <img
              className="sidebar-logo"
              src="../../src/assets/sidebar-logo.png"
              alt="Logo"
            />
          </Box>

          {/* Navigation links */}
          <Box bottom="0" className="navigation-links">
            <List>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <NavigationLink
                icon={<SpaceDashboardIcon />}
                text="Dashboard"
                isActive={activeSection === "dashboard"}
                onClick={() => handleNavigation("dashboard")}
              />
              </Link>
              
              <Link to="/session" style={{ textDecoration: 'none', color: 'inherit' }}>
              <NavigationLink
                icon={<AccessTimeFilledIcon />}
                text="Sessions"
                isActive={activeSection === "session"}
                onClick={() => handleNavigation("session")}
              />
              
              </Link>
              
              <Link to="/pastureinfo" style={{ textDecoration: 'none', color: 'inherit' }}>
              <NavigationLink
                icon={<GrassIcon />}
                text="Pastures"
                isActive={activeSection === "pastureinfo"}
                onClick={() => handleNavigation("pastureinfo")}
              />
              </Link>
              
            <Link to="/waste" style={{ textDecoration: 'none', color: 'inherit' }}>
              <NavigationLink
                icon={<RecyclingIcon />}
                text="Effluent"
                isActive={activeSection === "waste"}
                onClick={() => handleNavigation("waste")}
              />
              </Link>
              
              <Link to="/rotation" style={{ textDecoration: 'none', color: 'inherit' }}>
              <NavigationLink
                icon={<ScreenRotationAltIcon />}
                text="Rotations"
                isActive={activeSection === "rotations"}
                onClick={() => handleNavigation("rotations")}
              />
              </Link>


            <Link to="/report" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavigationLink
              icon={<AssessmentIcon />}
              text="Reports"
              isActive={activeSection === "report"}
              onClick={() => handleNavigation("report")}
            />
            </Link>
            </List>

            <List>
            <Link to="/em08profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <NavigationLink
                icon={<AccountCircleIcon />}
                text="Profile"
                isActive={activeSection === "profile"}
                onClick={() => handleNavigation("/profile")}
              />
              </Link>

              <Link to="/HomeM" style={{ textDecoration: 'none', color: 'inherit' }}>
              <NavigationLink
                icon={<LogoutIcon />}
                text="Logout"
                isActive={activeSection === "logout"}         //check this
                onClick={() => handleNavigation("logout")}
              />
              </Link>
            </List>

          </Box>


          
        </Box>
      </Box>
    );
  }

  export default Sidebar;

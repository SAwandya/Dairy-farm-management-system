import React from 'react';
import NavigationLink from '../NavigationLink';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HandshakeIcon from '@mui/icons-material/Handshake';
import WalletIcon from '@mui/icons-material/Wallet';

function Sidebar() {
    
     const isActive = (path) => {
    return location.pathname === path;
  };

    return (
         <Box className="sidebar" sx={{ position: 'fixed', left: 0, top: 0}}>

            <Box className="sidebar-logo-container">
                <img className="sidebar-logo" src="../../src/assets/sidebar-logo.png" alt="Logo" />
            </Box>
            
            {/* Dashboard link */}
            <Box className="navigation-links">
                <List>
                    <Link to="/FinanceDashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                        icon={<SpaceDashboardIcon />}
                        text="Dashboard"
                        isActive={isActive("/FinanceDashboard")}
                    />
                    </Link>

                    {/* Transactions page Link */}
                    <Link to="/financetrans" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                        icon={<HandshakeIcon />}
                        text="Transactions"
                        isActive={isActive("/financetrans")}
                    />
                    </Link>

                    {/* Budgets page Link */}
                    <Link to="/financebud" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                        icon={<WalletIcon />}
                        text="Budgets"
                        isActive={isActive("/financebud")}
                    />
                    </Link>
                    <Link to="/financereport" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink 
                        icon={<AssessmentIcon />}
                        text="Reports"
                        isActive={isActive("/financereport")}
                    />
                    </Link>
                </List>
                </Box>

            <Box className="user-actions" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                <List>
                    <Link to="/financeprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                            icon={<AccountCircleIcon />}
                            text="Profile"
                            isActive={isActive("/financeprofile")}
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
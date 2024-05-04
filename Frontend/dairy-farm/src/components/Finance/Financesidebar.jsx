import React, { useState } from 'react';
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
    const [activeSection, setActiveSection] = useState('dashboard'); 

    const handleNavigation = (section) => {
        setActiveSection(section);
    };

    return (
         <Box className="sidebar" sx={{ position: 'fixed', left: 0, top: 0}}>

            <Box className="sidebar-logo-container">
                <img className="sidebar-logo" src="../../src/assets/sidebar-logo.png" alt="Logo" />
            </Box>
            
            {/* Navigation links */}
            <Box className="navigation-links">
                <List>
                    <Link to="/FinanceDashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                        icon={<SpaceDashboardIcon />}
                        text="Dashboard"
                        isActive={activeSection === 'dashboard'}
                        onClick={() => handleNavigation('dashboard')}
                    />
                    </Link>
                    <Link to="/financetrans" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                        icon={<HandshakeIcon />}
                        text="Transactions"
                        isActive={activeSection === 'transactions'}
                        onClick={() => handleNavigation('transactions')}
                    />
                    </Link>
                    <Link to="/financebud" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                        icon={<WalletIcon />}
                        text="Budgets"
                        isActive={activeSection === 'budgets'}
                        onClick={() => handleNavigation('budgets')}
                    />
                    </Link>
                    <Link to="/financereport" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink 
                        icon={<AssessmentIcon />}
                        text="Reports"
                        isActive={activeSection === 'reports'}
                        onClick={() => handleNavigation('reports')}
                    />
                    </Link>
                </List>
                </Box>

            {/* Profile and Logout */}
            <Box className="user-actions" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                <List>
                    <Link to="/financeprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                            icon={<AccountCircleIcon />}
                            text="Profile"
                            isActive={activeSection === 'profile'}
                            onClick={() => handleNavigation('profile')}
                    />
                    </Link>
                    <Link to="/homeM" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NavigationLink
                        icon={<LogoutIcon />}
                        text="Logout"
                        isActive={activeSection === 'logout'}
                        onClick={() => handleNavigation('logout')}
                    />
                    </Link>
                </List>
            </Box>
        </Box>
    );
}

export default Sidebar;
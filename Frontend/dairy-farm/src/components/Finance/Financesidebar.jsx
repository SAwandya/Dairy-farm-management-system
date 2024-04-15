import React, { useState } from 'react';
import NavigationLink from '../NavigationLink';
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
         <Box className="sidebar" sx={{
            position: "fixed",
            zIndex: 1, // Ensure it stays above other content
        }}>
            
            <Box className="sidebar-logo-container">
                <img className="sidebar-logo" src="../../src/assets/sidebar-logo.png" alt="Logo" />
            </Box>
            
            {/* Navigation links */}
            <Box className="navigation-links">
                <List>
                    <NavigationLink
                        icon={<SpaceDashboardIcon />}
                        text="Dashboard"
                        isActive={activeSection === 'dashboard'}
                        onClick={() => handleNavigation('dashboard')}
                    />
                    <NavigationLink
                        icon={<HandshakeIcon />}
                        text="Transactions"
                        isActive={activeSection === 'transactions'}
                        onClick={() => handleNavigation('transactions')}
                    />
                    <NavigationLink
                        icon={<WalletIcon />}
                        text="Budgets"
                        isActive={activeSection === 'budgets'}
                        onClick={() => handleNavigation('budgets')}
                    />
                    <NavigationLink
                        icon={<AssessmentIcon />}
                        text="Reports"
                        isActive={activeSection === 'reports'}
                        onClick={() => handleNavigation('reports')}
                    />
                </List>
            </Box>

            {/* Profile and Logout */}
            <Box className="user-actions">
                <List>
                    <NavigationLink
                            icon={<AccountCircleIcon />}
                            text="Profile"
                            isActive={activeSection === 'profile'}
                            onClick={() => handleNavigation('profile')}
                    />
                    <NavigationLink
                        icon={<LogoutIcon />}
                        text="Logout"
                        isActive={activeSection === 'logout'}
                        onClick={() => handleNavigation('logout')}
                    />
                </List>
            </Box>
        </Box>
    );
}

export default Sidebar;
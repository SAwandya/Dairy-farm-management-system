import React from 'react';
import Name from "./Name"
import Date from "./Date"
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import the Notifications icon

function Welcome() {
    return (
        <Box className="welcome-header" sx={{  }}>

            <Box sx={{ mr:11  }}>
                <Name />
            </Box >
            <Box sx={{ml:68}}>
                <Date />
            </Box>
            <Box sx={{ml:-4,mt:-2,mr:-9}}>
            <Link to="/reordernotify" style={{ textDecoration: 'none' }}>
                    <IconButton color="inherit" aria-label="notifications" sx={{ fontSize: 32 }}> {/* Increase the icon size */}
                        <NotificationsIcon /> {/* Render the Notifications icon */}
                    </IconButton>
                </Link>
            </Box>
        </Box>
    );
} 

export default Welcome;

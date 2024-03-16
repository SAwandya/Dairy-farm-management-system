// NavigationLink.js
import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

function NavigationLink({ icon, text, isActive, onClick }) {
    return (
        <ListItemButton
            selected={isActive}
            onClick={onClick}
        >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={text} />
        </ListItemButton>
    );
}

export default NavigationLink;

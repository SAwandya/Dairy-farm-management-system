import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import "../styles/milking.css";
import { css } from "@emotion/react";

function NavigationLink({ icon, text, isActive, onClick }) {
    return (
        <Box sx={{ 
            backgroundColor: isActive ? '#74C6A8' : 'transparent', 
            borderRadius: '15px',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column' 
        }}>
            <ListItemButton 
                selected={isActive}
                onClick={onClick}
                className={`nav-btn${isActive ? 'active' : ''}`}
                // css={css`
                //         &.Mui-selected {
                //             background-color: #74C6A8;
                //         }
                //         &.Mui-focusVisible {
                //             background-color: rgba(0,0,0,0);
                //         }
                //         :hover {
                //             background-color: rgba(255,255,255,0.1);
                //         }
                // `}
                sx={{
                    borderRadius: '15px',
                    marginTop: '8px'
                }}
            >
                {icon && <ListItemIcon
                            className='nav-btn-icon'
                            sx={{
                                width: '20px',
                                height: '20px',
                                color: isActive ? '#000' : '#fff',
                            }}
                        >{icon}</ListItemIcon>}
                <ListItemText
                    className='nav-btn-text'
                    primary={text}
                    sx={{
                        color: isActive ? '#000' : '#fff',
                        textAlign: 'center'
                    }}
                />
            </ListItemButton>
        </Box>
    );
}

export default NavigationLink;
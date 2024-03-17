/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import "../styles/milking.css";
import { css } from "@emotion/react";

function NavigationLink({ icon, text, isActive, onClick }) {
    return (
        <ListItemButton 
            selected={isActive}
            onClick={onClick}
            className={`nav-btn${isActive ? 'active' : ''}`}
            css={css`
                    &.Mui-selected {
                        background-color: #74C6A8;
                    }
                    &.Mui-focusVisible {
                        background-color: rgba(0,0,0,0);
                    }
                    :hover {
                        background-color: rgba(255,255,255,0.1);
                    }
            `}
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
    );
}

export default NavigationLink;

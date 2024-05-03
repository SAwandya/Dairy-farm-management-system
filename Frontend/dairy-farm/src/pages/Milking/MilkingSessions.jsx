import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import SessionsContent from "../../components/Milking/SessionsContent";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MilkingSessions() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <ToastContainer />
            <MilkingSideBar />
            <SessionsContent />
        </Container>
    );
}

export default MilkingSessions;
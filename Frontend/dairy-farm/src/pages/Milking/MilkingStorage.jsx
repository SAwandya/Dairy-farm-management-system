import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import StorargeContent from "../../components/Milking/StorageContent";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MilkingStorage() {
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
            <StorargeContent />
        </Container>
    );
}

export default MilkingStorage;
import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import Container from "@mui/material/Container";
import NewTankFormContent from "../../components/Milking/NewTankFormContent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewTank() {
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
            <NewTankFormContent />
        </Container>
    );
}

export default AddNewTank;
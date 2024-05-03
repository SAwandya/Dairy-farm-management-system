import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import ScheduleFormContent from "../../components/Milking/ScheduleFormContent";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MilkingSessionSchedule() {
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
            <ScheduleFormContent />
        </Container>
    );
}

export default MilkingSessionSchedule;
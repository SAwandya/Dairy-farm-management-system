import React from "react";
import Sidebar from "../../components/Grazing/GrazingSideBar";
import Container from "@mui/material/Container";
import ScheduleSessionForm from "../../components/Grazing/ScheduleSession";

function Session() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <Sidebar />
            <ScheduleSessionForm/>

            
        </Container>
    );
}

export default Session;
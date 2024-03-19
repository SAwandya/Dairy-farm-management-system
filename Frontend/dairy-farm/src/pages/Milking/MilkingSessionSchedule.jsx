import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import ScheduleFormContent from "../../components/Milking/ScheduleFormContent";
import Container from "@mui/material/Container";

function MilkingSessionSchedule() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <MilkingSideBar />
            <ScheduleFormContent />
        </Container>
    );
}

export default MilkingSessionSchedule;
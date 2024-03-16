import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import DashboardContent from "../../components/Milking/DashboardContent";
import Container from "@mui/material/Container";

function MilkingDashboard() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <MilkingSideBar />
            <DashboardContent />
        </Container>
    );
}

export default MilkingDashboard;
import React from "react";
import DashboardContent from "../../components/Production/DashboardContent";
import productionSidebar from "../../components/Production/ProductionSideBar";
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
        <DashboardContent />
        <productionSidebar/>
        
        </Container>
    );
}

export default MilkingDashboard;
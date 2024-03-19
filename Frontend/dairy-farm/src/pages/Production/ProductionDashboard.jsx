import React from "react";
import DashboardContent from "../../components/Production/DashboardContent";
import ProductionSidebar from "../../components/production/ProductionSidebar"
import Container from "@mui/material/Container";

function ProductionDashboard() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <ProductionSidebar />
            <DashboardContent />
            
        </Container>
    );
}

export default ProductionDashboard;
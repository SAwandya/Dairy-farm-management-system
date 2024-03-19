import React from "react";
import DashboardContent from "../../components/production/DashboardContent";
import ProductionSidebar from "../../components/production/productionSidebar";
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
import React from "react";
import MilkingSideBar from "../../components/Supplier/SupplierSideBar";
import DashboardContent from "../../components/Supplier/DashboardContent";
import Container from "@mui/material/Container";

function SupplierDashboard() {
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

export default SupplierDashboard;
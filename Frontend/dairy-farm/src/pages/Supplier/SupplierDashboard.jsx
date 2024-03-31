import React from "react";
import SupplierSideBar from "../../components/Supplier/SupplierSideBar";
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
            <SupplierSideBar />
            <DashboardContent />
        </Container>
    );
}

export default SupplierDashboard;
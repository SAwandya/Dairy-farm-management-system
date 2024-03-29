import React from "react";
import Container from "@mui/material/Container";
import Financesidebar from "../../components/Finance/Financesidebar"
import DashboardContent from "../../components/Finance/DashboardContent/DashboardContent"


function FinanceMainDashboard() {
    return (
                <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <Financesidebar />
            <DashboardContent />
        </Container>
    );
}

export default FinanceMainDashboard;
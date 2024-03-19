import React from "react";
import ProductionSidebar from "../../components/production/productionSidebar"
import ProcessForm from "../../components/production/ProcessForm";
import Container from "@mui/material/Container";

function ProcessPlanning() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <ProductionSidebar />
            <ProcessForm />
        </Container>
    );
}

export default ProcessPlanning;
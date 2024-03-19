import React from "react";
import ProductionSidebar from "../../components/production/ProductionSidebar"
import ProcessContent from "../../components/production/ProcessPageContent";
import Container from "@mui/material/Container";

function ProcessPage() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <ProductionSidebar />
            <ProcessContent />
        </Container>
    );
}

export default ProcessPage;
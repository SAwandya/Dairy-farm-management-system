import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import MilkingReportContent from "../../components/Milking/MilkingReportContent";
import Container from "@mui/material/Container";

function MilkingReport() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <MilkingSideBar />
            <MilkingReportContent />
        </Container>
    );
}

export default MilkingReport;
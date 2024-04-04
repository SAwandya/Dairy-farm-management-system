import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import MilkingDataContent from "../../components/Milking/MilkingDataContent";
import Container from "@mui/material/Container";

function MilkingData() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <MilkingSideBar />
            <MilkingDataContent />
        </Container>
    );
}

export default MilkingData;
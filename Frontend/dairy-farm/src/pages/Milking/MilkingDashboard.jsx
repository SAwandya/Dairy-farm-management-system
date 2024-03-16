import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import Container from "@mui/material/Container";

function MilkingDashboard() {
    return (
        <Container className="main-container">
            <MilkingSideBar />
        </Container>
    );
}

export default MilkingDashboard;
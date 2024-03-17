import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import SessionsContent from "../../components/Milking/SessionsContent";
import Container from "@mui/material/Container";

function MilkingSessions() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <MilkingSideBar />
            <SessionsContent />
        </Container>
    );
}

export default MilkingSessions;
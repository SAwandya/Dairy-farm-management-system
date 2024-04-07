import React from "react";
import MilkingSideBar from "../../components/Milking/MilkingSideBar";
import Container from "@mui/material/Container";
import NewTankFormContent from "../../components/Milking/NewTankFormContent";

function AddNewTank() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <MilkingSideBar />
            <NewTankFormContent />
        </Container>
    );
}

export default AddNewTank;
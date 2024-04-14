import React from "react";
import MilkingDataContent from "../../components/Milking/MilkingDataContent";
import Sidebar from "../../components/production/productionSidebar";
import Container from "@mui/material/Container";

function DataForProduction() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                width: '100vw'
            }}
        >
            <Sidebar />
            <MilkingDataContent className='milking-data' />
        </Container>
    );
}

export default DataForProduction;
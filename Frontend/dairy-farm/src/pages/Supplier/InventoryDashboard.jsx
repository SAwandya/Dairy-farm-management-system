import React from "react";
import SupplierSideBar from "../../components/Supplier/SupplierSideBar";
import Container from "@mui/material/Container";
import InventoryContent from "../../components/Supplier/InventoryContent";

function SupplierInventory() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <SupplierSideBar />
            <InventoryContent />
        </Container>
    );
}

export default SupplierInventory;
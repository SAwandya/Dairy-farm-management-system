import React from "react";
import SupplierSideBar from "../../components/Supplier/SupplierSideBar";
import Container from "@mui/material/Container";
import ItemContent from "../../components/Supplier/ItemContent";

function SupplierOrder() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <SupplierSideBar />
            <ItemContent />
        </Container>
    );
}

export default SupplierOrder;
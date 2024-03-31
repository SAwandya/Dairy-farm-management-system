import React from "react";
import SupplierSideBar from "../../components/Supplier/SupplierSideBar";
import Container from "@mui/material/Container";
import OrderContent from "../../components/Supplier/OrderContent";

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
            <OrderContent />
        </Container>
    );
}

export default SupplierOrder;
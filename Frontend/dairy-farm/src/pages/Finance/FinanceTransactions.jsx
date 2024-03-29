import React from "react";
import Container from "@mui/material/Container";
import Financesidebar from "../../components/Finance/Financesidebar"
import TransactionsDashboard from "../../components/Finance/Transactions/TransactionsDashboard";


function FinanceTransactions() {
    return (
                <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <Financesidebar />
            <TransactionsDashboard />
        </Container>
    );
}

export default FinanceTransactions;
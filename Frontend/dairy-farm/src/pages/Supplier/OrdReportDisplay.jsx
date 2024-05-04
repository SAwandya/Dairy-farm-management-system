import React from 'react';
import '../../styles/main.css';
import BgCard from '../../components/Veterinary/bgCard';
import DateV from '../../components/Veterinary/DateV';
import Sidebar from '../../components/Supplier/SupplierSideBar';
import OrderReport from './OrderReport';

function OrdReportDisplay() {
    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Poppins, sans-serif' }}>
            <Sidebar />
            <div style={{ 
                flex: 1,
                padding: '10px', 
                margin: '50px ', 
                marginBottom: '20px', 
                paddingLeft: '130px', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                <DateV />
                <h4>Welcome Back,</h4>
                <div style={{ marginTop:"70px", textAlign: 'center' }}>
                    <BgCard style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <p>{new Date().toLocaleDateString()} Supplier Report</p>
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                                <OrderReport />
                            </div>
                        </div>
                    </BgCard>
                </div>
            </div>
        </div>
    );
}

export default OrdReportDisplay;
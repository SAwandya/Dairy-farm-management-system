import React, { useState } from 'react';
import '../../styles/main.css';
import BgCard from '../../components/Veterinary/bgCard';
import Tabs from '../../components/Veterinary/breed-tab';
import DateV from '../../components/Veterinary/DateV';
import Sidebar from '../../components/Veterinary/vetNav';
import ReportAnim from './ReportAnimReg';

function VetReport() {
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
                <h1>Duvini Ranaweera</h1>
                <div style={{ marginTop:"70px", textAlign: 'center' }}>
                    <BgCard style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <p>{new Date().toLocaleDateString()} Animal Registry</p>
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                                <ReportAnim />
                            </div>
                        </div>
                    </BgCard>
                </div>
            </div>
        </div>
    );
}

export default VetReport;

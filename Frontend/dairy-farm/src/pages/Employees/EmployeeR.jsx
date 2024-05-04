import React, { useState } from 'react';
import '../../styles/main.css';
import BgCard from '../../components/Veterinary/bgCard';
import DateV from '../../components/Veterinary/DateV';
import Esidebar from "../../components/Employees/esidebar";
import EmployeeReport from './Employee_report';
import Report from './Attendance_R';
function EmployeeR() {
    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Poppins, sans-serif' }}>
            <Esidebar />
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
                <h1>Disara Methmali</h1>
                <div style={{ marginTop:"70px", textAlign: 'center' }}>
                    <BgCard style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <p>{new Date().toLocaleDateString()} Employee Registration</p>
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                                <EmployeeReport />
                                
                            </div>
                            <div>
                           
                            </div>
                        </div>
                    </BgCard>
                    <BgCard style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           
                         
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <p>{new Date().toLocaleDateString()} Employee Attendance</p>
                            </div>
                        
                            <div style={{ marginLeft: '20px' }}>
                                <Report />
                                
                            </div>
                            </div>
                        </div>
                    </BgCard>
                </div>
            </div>
        </div>
    );
}

export default EmployeeR;

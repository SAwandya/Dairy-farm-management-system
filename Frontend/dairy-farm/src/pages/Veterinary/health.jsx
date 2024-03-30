import React, { useState } from 'react';
import '../../styles/main.css';
import BgCard from '../../components/Veterinary/bgCard';
import Tabs from '../../components/Veterinary/breed-tab';
import DateV from '../../components/Veterinary/DateV';
import Sidebar from '../../components/Veterinary/vetNav';
import VaccineAnim from './vaccineAnim';
import ExamineAnim from './examineAnim';

function Health() {
    const [showVaccineAnim, setShowVaccineAnim] = useState(false);
    const [showExamineAnim, setShowExamineAnim] = useState(false);

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Poppins, sans-serif' }}>
            <Sidebar />
            <div style={{ 
                flex: 1,
                padding: '10px', 
                margin: '50px ', 
                marginBottom: '20px', 
                paddingLeft:'130px', 
            }}>
                <DateV />
                <h4>Welcome Back,</h4>
                <h1>Duvini Ranaweera</h1>
                {!showVaccineAnim && !showExamineAnim &&(
                <div>
                    <h4 style={{ marginTop: 40, marginBottom: '20px' }}>Animal List</h4>
                    <BgCard>
                    <Tabs handleToggleVaccineAnim={() => setShowVaccineAnim(true)} handleToggleExamAnim={() => setShowExamineAnim(true)} />
                    </BgCard>
                </div>
                )}
                {showVaccineAnim && <VaccineAnim handleClose={() => setShowVaccineAnim(false)} />}
                {showExamineAnim && <ExamineAnim handleClose={()=> setShowExamineAnim(false)}/>}
            </div>
        </div>
    );
}

export default Health;

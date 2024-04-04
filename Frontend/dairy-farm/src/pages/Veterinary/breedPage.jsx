import React from 'react';
import '../../styles/main.css';
import BgCard from '../../components/Veterinary/bgCard';
import DateV from '../../components/Veterinary/DateV';
import Sidebar from '../../components/Veterinary/vetNav';
import BreedingCards from './bredding';

function BreedPage() {
    return (
        <div style={{ display: 'flex', height: '100vh',fontFamily: 'Poppins, sans-serif' }}>
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
                
                <h4 style={{ marginTop: 20, marginBottom: '20px' }}>Pregnant Cow List</h4>
                <BgCard>
                    <BreedingCards/>
                </BgCard>
            </div>
        </div>
    );
}

export default BreedPage;

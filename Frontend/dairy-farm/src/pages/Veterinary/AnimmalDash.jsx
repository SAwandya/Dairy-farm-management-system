import React from 'react';
import '../../styles/main.css';
import BgCard from '../../components/Veterinary/bgCard';
import BasicCard from '../../components/Veterinary/cards';
import cow from '../../assets/cow.png';
import Tabs from '../../components/Veterinary/tab';
import DateV from '../../components/Veterinary/DateV';
import Sidebar from '../../components/Veterinary/vetNav';

function VetDashboard() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}> {/* Set height to 100vh to fill the entire viewport */}
            <Sidebar />
            <div style={{ 
                flex: 1, /* Use flex to allow content to fill available space */
                padding: '10px', 
                margin: '50px ', 
                marginBottom: '20px', 
              }}>
                <DateV />
                <h4>Welcome Back,</h4>
                <h1>Duvini Ranaweera</h1>
                
                <h4 style={{ marginTop: 20, marginBottom: '20px' }}>Overview</h4>
                <div className='card-horizontal' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <BasicCard title='Total Cows' imgs={cow} data={12} />
                    <BasicCard title='Sick Cows' imgs={cow} data={2} />
                    <BasicCard title='Composition' imgs={cow} data={2} />
                </div>
                
                <h4 style={{ marginTop: 40, marginBottom: '20px' }}>Navigate</h4>
                <BgCard>
                    <Tabs />
                </BgCard>
            </div>
        </div>
    );
}

export default VetDashboard;

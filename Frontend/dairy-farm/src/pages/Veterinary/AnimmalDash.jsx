import React from 'react';
import '../../styles/main.css';
import BgCard from '../../components/Veterinary/bgCard';
import BasicCard from '../../components/Veterinary/cards';
import cow from '../../assets/cow.png';
import Tabs from '../../components/Veterinary/tab';


function VetDashboard() {
  
    return (
      
        <div style={{ 
            marginTop: 80, 
            height: '100vh', 
            padding: '10px', 
            backgroundColor: 'rgba(255, 255, 255, 0)', 
            margin: '50px ', 
            position: 'relative', 
            backgroundImage: 'url("../../assets/bg.png")', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover', 
        }}>
        <h3>Welcome Duvini,</h3>
        <h4>Overview</h4>
        <div className='card-horizontal' style={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
          <BasicCard title='Total Cows' imgs={cow} data={12} />
          <BasicCard title='Sick Cows' imgs={cow} data={2} />
          <BasicCard title='Composition' imgs={cow} data={2} />
        </div>
        <h4>Navigate</h4>
        <BgCard>
           <Tabs/>
        </BgCard>
      </div>
    );
  }
  
  
  export default VetDashboard;
  
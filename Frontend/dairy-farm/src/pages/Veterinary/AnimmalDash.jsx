import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/main.css';
import BgCard from '../../components/Veterinary/bgCard';
import BasicCard from '../../components/Veterinary/cards';
import cow from '../../assets/cow.png';
import Tabs from '../../components/Veterinary/tab';
import DateV from '../../components/Veterinary/DateV';
import Sidebar from '../../components/Veterinary/vetNav';

function VetDashboard() {
    const [totalCount, setTotalCount] = useState(0);
    const [breedCount,setBreedCount]=useState(0);
    const [sickCount,setSickCount]=useState(0);

    useEffect(() => {
        fetchTotalCount();
    }, []);

    const fetchTotalCount = async () => {
      //total animal count
        try {
            const response = await axios.get("http://localhost:3000/api/animalReg/count");
            if (response.data.success) {
                setTotalCount(response.data.count);
            }
        } catch (error) {
            console.error("Error fetching total count:", error);
            
        }
    };
    useEffect(() => {
        // pregnant animals count
        const fetchPregnantCount = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/exmAnim/count-pregnancy-check');
            if (response.data.success) {
                setBreedCount(response.data.count);
            }
          } catch (error) {
            console.error("Error fetching pregnant count:", error);
          }
        };
        fetchPregnantCount();
  }, []);
  useEffect(() => {
    // sick animals count
    const fetchSickCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/exmAnim/count-sick');
        if (response.data.success) {
            setSickCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching sick count:", error);
      }
    };
    fetchSickCount();
}, []);

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
                
                <h4 style={{ marginTop: 20, marginBottom: '20px' }}>Overview</h4>
                <div className='card-horizontal' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',width:'600',marginRight:'130px',marginLeft:'130px' }}>
                    <BasicCard title='Total Cows' imgs={cow} data={totalCount} />
                    <BasicCard title='Sick Cows' imgs={cow} data={sickCount} />
                    <BasicCard title='Pregnant' imgs={cow} data={breedCount} />
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

import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import CustomCard from "../../components/Veterinary/breedCard"; 
import EditForm from '../../components/Veterinary/EditForm'; 

function BreedingCards() {
    const [animals, setAnimals] = useState([]);
    const [editAnimal, setEditAnimal] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/exmAnim/retrieve2/pregnant');
                if (response.data.success) {
                    setAnimals(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleEdit = (animal) => {
        setEditAnimal(animal);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/exmAnim/delete/${id}`);
            if (response.data.success) {
                
                setAnimals(prevAnimals => prevAnimals.filter(animal => animal._id !== id));
                console.log('Animal deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting animal:', error);
        }
    };

    const handleUpdate = async (updatedAnimal) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/exmAnim/update/${updatedAnimal._id}`, updatedAnimal);
            if (response.data.success) {
               
                setAnimals(prevAnimals => prevAnimals.map(animal => {
                    if (animal._id === updatedAnimal._id) {
                        return updatedAnimal;
                    }
                    return animal;
                }));
                console.log('Animal updated successfully');
                setEditAnimal(null); 
            }
        } catch (error) {
            console.error('Error updating animal:', error);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                {animals.map(animal => (
                    <Grid item xs={12} sm={6} md={4} key={animal._id}>
                        {editAnimal && editAnimal._id === animal._id ? (
                            <EditForm
                                animal={editAnimal}
                                handleUpdate={handleUpdate}
                                onCancel={() => setEditAnimal(null)}
                            />
                        ) : (
                            <CustomCard
                                title={`Ear Tag: ${animal.earTag}`}
                                data={`Exam Date: ${new Date(animal.checkdate).toLocaleDateString()}`}
                                data1={`Status: ${animal.currentStatus}`}
                                imgs="../../../src/assets/cow1.png" 
                                onEdit={() => handleEdit(animal)} 
                                onDelete={() => handleDelete(animal._id)} 
                            />
                        )}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default BreedingCards;

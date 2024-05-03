import React, { useEffect, useState } from 'react';
import '../../styles/registery.css';
import '../../styles/main.css';
import Swal from 'sweetalert2';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import RegisterForm from '../../components/Veterinary/register_form';
import Sidebar from '../../components/Veterinary/vetNav';
import DateV from '../../components/Veterinary/DateV';
import CustomizedTables from '../../components/Veterinary/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TablePagination, Grid } from '@mui/material'; 
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

function AnimalRegistry() {
    const [addSection, setAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        earTag: "",
        location: "",
        gender: "",
        batch: "",
        age: "",
        name: "",
        weight: null,
        breed: "",
        color: "",
        birthDate: null,
    });
    const [formDataEdit, setFormDataEdit] = useState({
        earTag: "",
        location: "",
        gender: "",
        batch: "",
        age: "",
        name: "",
        weight: null,
        breed: "",
        color: "",
        birthDate: null,
        _id: ""
    });
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post("http://localhost:3000/api/animalReg/create", formData);
            if (data.data.success) {
                setAddSection(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfuly added",
                    showConfirmButton: false,
                    timer: 1500
                });
                getFetchData();
                setFormData({
                    earTag: "",
                    location: "",
                    gender: "",
                    batch: "",
                    age: "",
                    name: "",
                    weight: null,
                    breed: "",
                    color: "",
                    birthDate: null,
                });
            }
        } catch (error) {
            console.error("Error adding animal:", error);
            alert("Error adding animal. Please try again later.");
        }
    };

    const getFetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/animalReg/retrieve");
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Error fetching data. Please try again later.");
        }
    };
    

    useEffect(() => {
        getFetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const deleteResponse = await axios.delete(`http://localhost:3000/api/animalReg/delete/${id}`);
                    getFetchData();
                    if (deleteResponse.data.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the file.",
                            icon: "error"
                        });
                    }
                }
            });
        } catch (error) {
            console.error("Error deleting animal:", error);
            alert("Error deleting animal. Please try again later.");
        }
    };


    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/animalReg/update/${formDataEdit._id}`, formDataEdit);
            if (response.data.success) {
                getFetchData();
                Swal.fire({
                    icon: "success",
                    title: "Data Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setEditSection(false);
            }
        } catch (error) {
            console.error("Error updating animal:", error);
            alert("Error updating animal. Please try again later.");
        }
    };

    const handleEditOnChange = async (e) => {
        const { value, name } = e.target;
        setFormDataEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/animalReg/retrieve/${id}`);
            if (response.data.success) {
                setFormDataEdit({ ...response.data.data, _id: id }); 
                setEditSection(true);
            }
        } catch (error) {
            console.error("Error fetching animal data:", error);
            alert("Error fetching animal data. Please try again later.");
        }
    };

    const headers = [
        "Ear Tag",
        "Location",
        "Gender",
        "Batch",
        "Age",
        "Name",
        "Weight(Kg)",
        "Breed",
        "Color",
        "Birth Date",
        "Action",
    ];

  
    const filteredData = dataList.filter(item => {
        if (!searchTerm) return true;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return Object.values(item).some(val => {
            if (val !== null && val !== undefined) {
                const lowerVal = String(val).toLowerCase();
                return lowerVal.includes(lowerSearchTerm);
            }
            return false; 
        });
    });

    

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Poppins, sans-serif' }}>
            <Sidebar />
            <div style={{ 
                flex: 1,
                padding: '10px', 
                margin: '50px ', 
                marginBottom: '20px',
                paddingLeft: '130px', 
                flexDirection: 'column', 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h4>Welcome Back,</h4>
                        <h1>Duvini Ranaweera</h1>
                    </div>
                    <DateV />
                </div>
                {!addSection && !editSection && (
                <Grid container spacing={2} style={{marginLeft:'740px'}}>
                <Grid item xs={3}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
                    <TextField
                        onChange={(event) => {
                            console.log("Search Term:", event.target.value); 
                            setSearchTerm(event.target.value);
                        }}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                            style: { marginBottom: '10px', width: '250px' }
                        }}
                    />
                    </div>
                    </Grid>
                    <Grid item xs={3}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
                    <button className='addbtn' onClick={() => setAddSection(true)} style={{ height: '55px',width: '200px', backgroundColor: '#00ff1a2b',color:'black',fontWeight: 'bold' }}>Add New Animal</button>
                    </div>
                    </Grid>
                </Grid>
            )}
               


                <div className='form'>
                    {addSection && (
                        <RegisterForm
                            handleSubmit={handleSubmit}
                            handleOnChange={handleOnChange}
                            handleClose={() => setAddSection(false)}
                            rest={formData}
                        />
                    )}
                    {editSection && (
                        <RegisterForm
                            handleSubmit={() => handleUpdate(formDataEdit._id)}
                            handleOnChange={handleEditOnChange}
                            handleClose={() => setEditSection(false)}
                            rest={formDataEdit}
                        />
                    )}
                </div>

                {!addSection && !editSection && (
                    <div className='table' style={{
                        flex: 1,
                        padding: '10px',
                        margin: '50px ',
                        marginTop:'-80px',
                        marginBottom: '20px',
                    }}>
                        
                        <CustomizedTables
                            headers={headers}
                            rows={filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => ({
                                "Ear Tag": item.earTag,
                                "Location": item.location,
                                "Gender": item.gender,
                                "Batch": item.batch,
                                "Age": item.age,
                                "Name": item.name,
                                "Weight(Kg)": item.weight,
                                "Breed": item.breed,
                                "Color": item.color,
                                "Birth Date": item.birthDate,
                                "Action": (
                                    <div>
                                        <IconButton onClick={() => handleEdit(item._id)} style={{ color: 'blue' }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(item._id)} style={{ color: 'red' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                )
                            }))}
                        />
                        <TablePagination
                            rowsPerPageOptions={[1,2,5, 10, 25]}
                            component="div"
                            count={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                         
                    </div>
                )}
            
            </div>
        </div>
    );
}

export default AnimalRegistry;

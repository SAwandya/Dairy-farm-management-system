import React, { useEffect, useState } from 'react';
import '../../styles/animvac.css';
import Swal from 'sweetalert2';
import axios from "axios";
import ExamineAnimrForm from '../../components/Veterinary/examineAnim_form';
import CustomizedTables from '../../components/Veterinary/table';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ExamineAnim=({handleClose})=> {
    const [addSection, setAddSection] = useState(false);
    const [editSection,setEditSection]=useState(false);
    const [formData, setFormData] = useState({
        earTag: "",
        currentStatus: "",
        exam:"",
        checkdate: null,
    });
    const [formDataEdit, setFormDataEdit] = useState({
        earTag: "",
        currentStatus: "",
        exam:"",
        checkdate: null,
        _id:""
    });
    const [dataList, setDataList] = useState([]);

    const handleOnChange = (e) => {
        if (e.target) {
            
            const { value, name } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } 
    };

    const handleSubmit = async (formData) => {
        try {
            const data = await axios.post("http://localhost:3000/api/exmAnim/create", formData);
            if (data.data.success) {
                setAddSection(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully added",
                    showConfirmButton: false,
                    timer: 1500
                });
                getFetchData();
                setFormData({
                    earTag: "",
                    currentStatus: "",
                    exam:"",
                    checkdate: null,
                });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "Ear tag does not exist") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ear tag doesn't exist"
                });
            } else {
                console.error("Error adding animal:", error);
                alert("Error adding animal. Please try again later.");
            }
        }
    };
    const getFetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/exmAnim/retrieve");
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
                        const deleteResponse = await axios.delete(`http://localhost:3000/api/exmAnim/delete/${id}`);
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
            const response = await axios.put(`http://localhost:3000/api/exmAnim/update/${formDataEdit._id}`, formDataEdit); 
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
    
    const handleEditOnChange=async(e)=>{
        const { value, name } = e.target;
        setFormDataEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/exmAnim/retrieve/${id}`);
            if (response.data.success) {
                setFormDataEdit({ ...response.data.data, _id: id }); // Include _id in formDataEdit
                setEditSection(true);
            }
        } catch (error) {
            console.error("Error fetching animal data:", error);
            alert("Error fetching animal data. Please try again later.");
        }
    };
    
    const headers = [
        "Ear Tag",
        "Current Status",
        "Examination",
        "Date",
        "Acction",
    ];

    return (
        <div style={{ display: 'flex', height: '100vh' }}> 
       
        <div style={{ 
             flex: 1, 
             padding: '10px', 
             margin: '50px ', 
             marginBottom: '20px', 
            fontFamily: 'Poppins, sans-serif',
            marginTop:'-80px'
        }}>
            
               
            {!addSection && !editSection && (
                <div className='container'
                sx={{ marginTop:'100px'}}
                >
                    <button className='addbtn' onClick={() => setAddSection(true)} sx={{ marginBottom:'-40px'}}>Add Vaccined </button>
                    
                </div>
                
            )}
            {!addSection && !editSection && (
                <div>
                    <ArrowBackIcon sx={{ marginTop: '10px', cursor: 'pointer' }} onClick={handleClose} />
                </div>
            )}
            
            <div className='form'>
                {addSection && (
                    <ExamineAnimrForm
                    handleSubmit={handleSubmit}
                    handleOnChange={handleOnChange}
                    handleClose={() => setAddSection(false)}
                    rest={formData}
                />
                )}
                {editSection && (
                    <ExamineAnimrForm
                        handleSubmit={() => handleUpdate(formDataEdit._id)}
                        handleOnChange={handleEditOnChange}
                        handleClose={() => setEditSection(false)}
                        rest={formDataEdit}
                    />
                )}
              </div>  
              {!addSection && !editSection &&(
                <div className='table' style={{ 
                    flex: 1, /* Use flex to allow content to fill available space */
                    padding: '10px', 
                    margin: '50px ', 
                    marginBottom: '20px',
                    marginTop:'-20px'
                    
               }}>
                
                    <CustomizedTables 
                        headers={headers}
                        rows={dataList.length > 0 ? dataList.map(item => ({
                            "Ear Tag": item.earTag,
                            "Current Status": item.currentStatus,
                            "Examination":item.exam,
                            "Date":item.checkdate,
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
                        })) : [{ "No Data": "No Data" }]}
                    />
                </div>
            )}
            
           
        </div>
        </div>
    );
}

export default ExamineAnim;

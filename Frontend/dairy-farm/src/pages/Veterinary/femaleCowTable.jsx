// FemaleCowTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CustomizedTables from '../../components/Veterinary/table';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { TablePagination } from '@mui/material';
import AIForm from "../../components/Veterinary/setAI";
import QuizIcon from '@mui/icons-material/Quiz';
import PregnancyForm from '../../components/Veterinary/checkPregnant';

function FemaleCowTable() {
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showAIForm, setShowAIForm] = useState(false);
    const [showPregnancyForm, setShowPregnancyForm] = useState(false);
    const [selectedCow, setSelectedCow] = useState(null);
    const [formData, setFormData] = useState({
        earTag: "",
        maleCowMateId: "",
        dateOfMate: null,
        isPregnant: "",
        calvingDate: null,
    });
    const [formDataEdit, setFormDataEdit] = useState({
        earTag: "",
        maleCowMateId: "",
        dateOfMate: null,
        isPregnant: "",
        calvingDate: null,
        _id: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post("http://localhost:3000/api/pregnantCow/pregnantCreate", formData);
            if (data.data.success) {
                setShowAIForm(false);
                
            }
        } catch (error) {
            
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/animalReg/retrieve-females");
            if (response.data.success && Array.isArray(response.data.count)) {
                setDataList(response.data.count);
            } else {
                setDataList([]);
            }
        } catch (error) {
            setDataList([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/pregnantCow/pregnantRetrieve/${id}`);
            if (response.data.success) {
                setFormDataEdit({ ...response.data.data, _id: id });
                setShowPregnancyForm(true);
            }
        } catch (error) {
            
        }
    };

    const headers = [
        "Ear Tag",
        "Gender",
        "Batch",
        "Age",
        "Name",
        "Weight (Kg)",
        "Breed",
        "Color",
        "Birth Date",
        "Set AI",
        "Check",
    ];

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleIconButtonClick = (cow) => {
        setSelectedCow(cow);
        setShowAIForm(true);
    };

    const handleFormClose = () => {
        setShowAIForm(false);
        setShowPregnancyForm(false);
        setSelectedCow(null);
    };

    return (
        <div>
            <div style={{ padding: '10px', margin: '50px', marginTop: '-80px', marginBottom: '20px' }}>
                {Array.isArray(dataList) && (
                    <>
                        <CustomizedTables
                            headers={headers}
                            rows={dataList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(item => ({
                                    "Ear Tag": item.earTag,
                                    "Gender": item.gender,
                                    "Batch": item.batch,
                                    "Age": item.age,
                                    "Name": item.name,
                                    "Weight (Kg)": item.weight,
                                    "Breed": item.breed,
                                    "Color": item.color,
                                    "Birth Date": item.birthDate,
                                    "Set AI": (
                                        <IconButton style={{ color: 'blue' }} onClick={() => handleIconButtonClick(item)}>
                                            <AssignmentIcon />
                                        </IconButton>
                                    ),
                                    "Check": (
                                        <IconButton style={{ color: 'red' }} onClick={() => handleEdit(item._id)}>
                                            <QuizIcon />
                                        </IconButton>
                                    )
                                }))
                            }
                        />
                        <TablePagination
                            component="div"
                            count={dataList.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                        {showAIForm && (
                            <AIForm
                                cow={selectedCow}
                                handleClose={handleFormClose}
                                handleSubmit={handleSubmit}
                                handleOnChange={handleOnChange}
                                rest={formData}
                            />
                        )}
                        {showPregnancyForm && (
                            <PregnancyForm
                                cow={selectedCow}
                                handleClose={handleFormClose}
                                handleSubmit={handleUpdate}
                                handleOnChange={handleEditOnChange}
                                rest={formDataEdit}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default FemaleCowTable;

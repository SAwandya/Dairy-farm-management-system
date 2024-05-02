import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, Badge } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, PickersDay, DateCalendar } from '@mui/x-date-pickers';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import axios from 'axios';

const HeaderTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 'bold',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: '8px',
    top: '8px',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 15, 
  fontWeight: 'bold', 
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  fontSize: 15, 
  fontWeight: 'bold',
}));

const Calendar = ({ onNextDateData }) => {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [earTag, setEarTag] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [vacDate, setVacDate] = useState([]);

  const fetchDataByDate = async (date) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/vacAnim/date/${date}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    }
    return [];
  };

  const handleDateSelect = async (newValue) => {
    setValue(newValue);
    const selectedDate = newValue.format('YYYY-MM-DD');
    const data = await fetchDataByDate(selectedDate);
    onNextDateData(data);

    if (data.length > 0) {
      const earTags = data.map(item => item.earTag);
      const vaccines = data.map(item => item.vaccine);
      const vacDate = data.map(item => item.vacdate); 
      setEarTag(earTags);
      setVaccine(vaccines);
      setVacDate(vacDate); 
    } else {
      setEarTag(['No Vaccinations']);
      setVaccine(['']);
      setVacDate(['']);
    }
  };

  useEffect(() => {
    if (Array.isArray(onNextDateData) && onNextDateData.length > 0) { 
      const nextDate = onNextDateData[0]?.date;
      const highlighted = nextDate ? [dayjs(nextDate).date()] : [];
      setHighlightedDays(highlighted);
    }
  }, [onNextDateData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container justifyContent="center"> 
        <Grid item xs={12} > 
          <Box p={2} border={1} borderColor="divider" display="flex" flexDirection="column" >
            <Box p={2} bgcolor="#f0f0f0" width={'400px'} mx="auto"> 
              <HeaderTypography variant="subtitle1" align="center">
                Schedules Vaccination for {value.format('MMMM DD, YYYY')}
              </HeaderTypography>
              <Typography variant="subtitle1" align="center">
                Select Date
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <DateCalendar
                    date={value}
                    onChange={handleDateSelect}
                    renderDay={(day, _value, DayComponentProps) => {
                      const isNextDate = highlightedDays.includes(day.date());

                      return (
                        <StyledBadge
                          key={day.toString()}
                          overlap='circular'
                          badgeContent={isNextDate ? <CheckIcon color='primary' /> : null}
                        >
                          <PickersDay {...DayComponentProps} />
                        </StyledBadge>
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <StyledTableContainer component={Paper}>
                <Table>
                  <TableHead >
                    <StyledTableRow >
                      <StyledTableCell>Ear Tag</StyledTableCell>
                      <StyledTableCell>Vaccine Name</StyledTableCell>
                      <StyledTableCell>Vaccinated Date</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {earTag.map((tag, index) => (
                      <TableRow key={index}>
                        <TableCell>{tag}</TableCell>
                        <TableCell>{vaccine[index]}</TableCell>
                        <TableCell>{vacDate[index]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default Calendar;

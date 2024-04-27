import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import axios from 'axios'; // Import axios for HTTP requests

// Styled Typography component for the headers
const HeaderTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 'bold',
}));

// Styled TableContainer component with transparent background color
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: 'transparent',
}));

const Calendar = ({ onNextDateData }) => {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [earTag, setEarTag] = useState([]);
  const [vaccine, setVaccine] = useState([]);

  // Fetch data based on next date
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

  // Event handler for date selection
  const handleDateSelect = async (newValue) => {
    setValue(newValue); // Update the selected date
    const selectedDate = newValue.format('YYYY-MM-DD'); // Format the selected date

    // Fetch data for the selected date
    const data = await fetchDataByDate(selectedDate);
    onNextDateData(data); // Send fetched data to the parent component

    // Set earTag and vaccine based on fetched data
    if (data.length > 0) {
      const earTags = data.map(item => item.earTag);
      const vaccines = data.map(item => item.vaccine);
      setEarTag(earTags);
      setVaccine(vaccines);
    } else {
      setEarTag(['No Vaccinations']);
      setVaccine(['']);
    }
  };

  useEffect(() => {
    if (Array.isArray(onNextDateData)) {
      const nextDate = onNextDateData[0]?.date; // Assuming onNextDateData is an array of objects with a 'date' property
      const highlighted = nextDate ? [dayjs(nextDate).date()] : [];
      setHighlightedDays(highlighted);
    }
  }, [onNextDateData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={2} border={1} borderColor="divider" display="flex">
        <Box flex="1">
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ear Tag</TableCell>
                  <TableCell>Vaccine</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {earTag.map((tag, index) => (
                  <TableRow key={index}>
                    <TableCell>{tag}</TableCell>
                    <TableCell>{vaccine[index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
        <Box flex="1">
          <Box p={2}>
            <HeaderTypography variant="subtitle1" align="center">
              SELECT DATE
            </HeaderTypography>
            <HeaderTypography variant="subtitle1" align="center">
              Schedules Vaccination for
            </HeaderTypography>
            <Typography variant="subtitle1" align="center">
              {value.format('ddd, MMM D')}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={8}>
                <DateCalendar
                  date={value}
                  onChange={handleDateSelect}
                  renderDay={(day, _value, DayComponentProps) => {
                    const isSelected =
                      !DayComponentProps.outsideCurrentMonth &&
                      highlightedDays.indexOf(day.getDate()) >= 0;

                    const isNextDate = highlightedDays.includes(day.date());

                    return (
                      <Badge
                        key={day.toString()}
                        overlap='circular'
                        badgeContent={isNextDate ? <CheckIcon color='red' /> : undefined}
                      >
                        <PickersDay {...DayComponentProps} />
                      </Badge>
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;

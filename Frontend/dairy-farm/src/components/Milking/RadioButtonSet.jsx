import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Typography } from '@mui/material';

function RadioButtonSet({ selectedOption, onOptionChange }) {
  const handleOptionChange = (event) => {
    onOptionChange(event.target.value);
  };

  const handleApply = () => {
    // You can directly call the onOptionChange function here if needed
    // onOptionChange(selectedOption);
  };

  return (
    <div style={{paddingBottom: '20px', borderBottom: '6px solid #38775B'}}>
      <Typography
        variant="h3"
        className='graph-card-title'
        sx={{
          fontSize: '20px',
          fontWeight: '600',
        }}
      >
        Select a Time Period
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="dateFilter"
            name="dateFilter"
            value={selectedOption}
            onChange={handleOptionChange}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '600px',
                marginTop: '16px'
            }}
          >
            <FormControlLabel
              value="last7days"
              control={<Radio />}
              label={
                <Typography variant="body1" style={{ fontFamily: 'Poppins' }}>
                  Last 7 days
                </Typography>
              }
            />
            <FormControlLabel
              value="lastMonth"
              control={<Radio />}
              label={
                <Typography variant="body1" style={{ fontFamily: 'Poppins' }}>
                  Last month
                </Typography>
              }
            />
            <FormControlLabel
              value="last6months"
              control={<Radio />}
              label={
                <Typography variant="body1" style={{ fontFamily: 'Poppins' }}>
                  Last 6 months
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
        <Button
            variant="contained"
            onClick={handleApply}
            style={{
                backgroundColor: '#38775B',
                color: '#fff',
                width: '20%',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                fontWeight: '600',
                fontSize: '18px',
                borderRadius: '15px',
            }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

export default RadioButtonSet;

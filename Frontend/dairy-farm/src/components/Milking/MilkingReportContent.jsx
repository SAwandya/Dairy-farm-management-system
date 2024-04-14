import { Box} from '@mui/material';
import React, { useState } from 'react';
import RadioButtonSet from './RadioButtonSet';
import GeneratePDFBtn from './GeneratePDFBtn';
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';

function MilkingReportContent() {
    const [selectedOption, setSelectedOption] = useState('last7days');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <Box className="dashboard-content">
            <RadioButtonSet selectedOption={selectedOption} onOptionChange={handleOptionChange} />
            <GeneratePDFBtn />
            <div
                style={{
                    display: 'flex',
                    gap: '22px',
                }}
            >
                <BarChartContainer selectedOption={selectedOption} />
                <PieChartContainer />
            </div>
        </Box>
    );
  }
  
  export default MilkingReportContent;
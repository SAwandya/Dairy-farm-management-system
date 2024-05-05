import React, { useState } from 'react';
import QRCodeScanner from '../../components/Employees/QRCodeScanner'; // Import your QRCodeScanner component
import { Button } from '@mui/material';

const App = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  const handleAttendanceButtonClick = () => {
    setShowQRCode(true);
  };

  return (
    <div>
      <h1>Attendance System</h1>
      <Button variant="contained" onClick={handleAttendanceButtonClick}>
        Attendance
      </Button>
      {showQRCode && <QRCodeScanner />}
    </div>
  );
};

export default App;

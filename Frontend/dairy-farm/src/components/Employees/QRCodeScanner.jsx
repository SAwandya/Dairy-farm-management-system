import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const QRCodeScanner = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Scan QR Code for Attendance</h1>
      <Button variant="contained" onClick={handleOpen}>
        Open QR Code
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 id="simple-modal-title">Scan the QR code</h2>
          <QRCode value="https://forms.gle/48GRhm7DF4e1ioZk8" />
          <p id="simple-modal-description">Scan the QR code to access the attendance form.</p>
          <Button onClick={handleClose}>Close QR Code</Button>
        </div>
      </Modal>
    </div>
  );
};

export default QRCodeScanner;

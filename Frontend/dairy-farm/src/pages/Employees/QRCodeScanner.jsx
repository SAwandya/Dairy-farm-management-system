
import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeScanner = () => {
  return (
    <div>
      <h1>Scan QR Code for Attendance</h1>
      <QRCode value="https://forms.gle/48GRhm7DF4e1ioZk8" />
      <p>Scan the QR code to access the attendance form.</p>
    </div>
  );
};

export default QRCodeScanner;

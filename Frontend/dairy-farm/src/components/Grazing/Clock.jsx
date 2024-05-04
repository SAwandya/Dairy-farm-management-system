import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div id="clock">
      <h1>Digital Clock</h1>
      <p>{time}</p>
    </div>
  );
}

export default Clock;

import React from 'react';

function AlarmList({ alarms, deleteAlarm }) {
  return (
    <div>
      <h2>Alarms</h2>
      <ul>
        {alarms.map((alarm, index) => (
          <li key={index}>
            {alarm}
            <button onClick={() => deleteAlarm(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlarmList;

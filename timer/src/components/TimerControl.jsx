import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); 

function TimerControl() {
  const handleStartTimer = () => {
    socket.emit('startTimer');  
  };

  return (
    <div className="control-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <button onClick={handleStartTimer} style={{padding: '10px'}}>Start Timer</button>
    </div>
  );
}

export default TimerControl;

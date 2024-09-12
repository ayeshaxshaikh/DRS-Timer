
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Timer.css';

const socket = io('http://localhost:3000');

function Timer() {
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    
    socket.on('timerUpdate', (newTime) => {
      setTimer(newTime);
    });

    socket.emit('startTimer');

    return () => {
      socket.off('timerUpdate');  
    };
  }, []);

  return (
    <div className='container'>
      <div className="timer-container">
        <div className='text'>
          <p>Review Timer</p>
        </div>
        <div className="timer-overlay">
          <p>{timer}</p>
        </div>
      </div>
    </div>
  );
}

export default Timer;

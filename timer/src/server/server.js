
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let drsTime = 15;
let interval;
let isTimerRunning = false; 

const startTimer = () => {
  if (isTimerRunning) return;  
  
  clearInterval(interval);
  drsTime = 15;
  isTimerRunning = true;  

  interval = setInterval(() => {
    if (drsTime > 0) {
      drsTime--;
    } else {
      drsTime = 0;
      isTimerRunning = false;  
      clearInterval(interval);
    }
    io.emit('timerUpdate', drsTime);  
  }, 1000);
};

io.on('connection', (socket) => {
  console.log('A user connected');
  
  startTimer();

  socket.emit('timerUpdate', drsTime);

  socket.on('startTimer', () => {
    console.log('Start timer requested');
    startTimer();
  });

  socket.on('resetTimer', () => {
    console.log('Timer reset requested');
    startTimer();
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

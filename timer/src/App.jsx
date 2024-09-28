import './App.css'
import Timer from './components/Timer'
import { Routes, Route } from 'react-router-dom';
import TimerControl from './components/TimerControl';


function App() {
  
  return (
    <>
        
      <Routes>
        <Route path='/' element={<Timer/>} />
        <Route path='/button' element={<TimerControl/>} />
        </Routes>  
        
    </>
  )
}

export default App

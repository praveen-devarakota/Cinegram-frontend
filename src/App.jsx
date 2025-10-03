import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar.jsx'
function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/about' element={<div>About Page</div>} />
      <Route path='/contact' element={<div>Contact Page</div>} />
    </Routes>
    </>
  )
}

export default App

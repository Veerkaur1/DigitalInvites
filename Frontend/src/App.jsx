import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './Components/Login';
import Register from './Components/Register';

function App() {

  return (
    <>
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>

      <BrowserRouter>
        <Routes>

          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

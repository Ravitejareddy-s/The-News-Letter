import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes , Route, Router } from "react-router-dom";
import Content from './pages/content/content.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/content" element={<Content />} />
      </Routes>
    </BrowserRouter>



  )
}

export default App

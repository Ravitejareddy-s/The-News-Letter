import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes , Route, Router } from "react-router-dom";
import Content from './pages/content/content.jsx'
import Bookmarked from './pages/bookmarked/bookmarked.jsx'
import Upvoted from './pages/Upvoted/Upvoted.jsx'
import Edit from './pages/Edit/Edit.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Upvoted" element={<Upvoted />} />
        <Route path="/Edit/:date/:link" element={<Edit />} />
        <Route path="/content" element={<Content />} />
        <Route path="/bookmarked" element={<Bookmarked />} />
      </Routes>

    </BrowserRouter>



  )
}

export default App

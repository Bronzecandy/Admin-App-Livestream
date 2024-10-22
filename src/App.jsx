import React from "react"
import Admin from "./pages/admin"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Admin/>} />
            <Route path="/video-manage" element={<Admin/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

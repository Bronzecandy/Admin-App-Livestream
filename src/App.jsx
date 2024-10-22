import React from "react"
import Admin from "./pages/Admin"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
      <Router>
        <Admin></Admin>
      </Router>
    </>
  )
}

export default App

import React from "react"
import Admin from "./pages/admin"
import { BrowserRouter as Router } from 'react-router-dom';
function App() {

  return (
    <>
      <Router>
        <Admin/>
      </Router>
    </>
  )
}

export default App

import Header from "./components/Header";
import React from 'react';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Signup from "/src/pages/Signup";
import Dashboard from "/src/pages/Dashboard";
import { ToastContainer , toast } from "react-toastify";
import './App.css';

function App() {
  return (
    <>
     <ToastContainer/>
     <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
     </Router>
     </>
  );
  
  
}

export default App;

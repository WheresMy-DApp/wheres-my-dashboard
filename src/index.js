import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login';
// import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';

export default function RootApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}v/>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RootApp />
);


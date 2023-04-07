import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/edititem/:id" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import EditProfile from './views/EditProfile'
import MyTravel from './views/MyTravel'
import AddMyTravel from './views/AddMyTravel'
import EditMyTravel from './views/EditMyTravel'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-travel/:id" element={<EditMyTravel />} />
        <Route path="/mytravel" element={<MyTravel />} />
        <Route path="/addmytravel" element={<AddMyTravel />} />
        <Route path="/editmytravel/:travelId" element={<EditMyTravel />} />
        <Route path="/editprofile/:travellerId" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
    </>


  )
}

export default App
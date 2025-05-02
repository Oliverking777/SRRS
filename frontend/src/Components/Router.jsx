import React from 'react'
import Home from '../Pages/Home/Home'

import { Route, Routes } from "react-router-dom";
import Userboard from '../Pages/Board/Userboard';
import Adminboard from '../Pages/Board/Adminboard';


const Router = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userdashboard" element={<Userboard />} />
        <Route path="/admindashboard" element={<Adminboard/>}/>
        

      </Routes>
    </div>
  )
}

export default Router
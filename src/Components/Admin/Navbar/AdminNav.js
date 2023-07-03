import React from 'react'
import './Navbar.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminNav() {

  const navigate = useNavigate();


    useEffect(() => {
      const admin = JSON.parse(localStorage.getItem('authTokenAdmin'));
      if (!admin) {
       navigate("/admin_login")
    }}, []);

    function logout (){
      localStorage.removeItem("authTokenAdmin");
      navigate("/")
    }

  return (
    <div>
      <div className='top1'>
        <div className='firstSection'>Welcome to the admin panel</div>
        <div className='SecondSection'>
          <div onClick={() => navigate("/admin")}> <button style={{backgroundColor:"rgb(139, 146, 146)",color:"black", border:"None"}}>Home</button> </div>
          <div onClick={() => navigate("/users")}> <button style={{backgroundColor:"rgb(139, 146, 146)",color:"black", border:"None"}}>Users</button></div>
          <div onClick={() => navigate("/department")}> <button style={{backgroundColor:"rgb(139, 146, 146)",color:"black", border:"None"}}>Department</button></div>
          <div onClick={() => navigate("/admin_ticket")}> <button style={{backgroundColor:"rgb(139, 146, 146)",color:"black", border:"None"}}>Token</button></div>
          <div onClick={logout}> <button style={{backgroundColor:"rgb(139, 146, 146)",color:"black", border:"None"}}>Log Out</button> </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNav
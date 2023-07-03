import React from 'react'
import './Navbar.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminNav() {

  const navigate = useNavigate();


    useEffect(() => {
      const admin = JSON.parse(localStorage.getItem('authTokenUser'));
      if (!admin) {
       navigate("/user_login")
    }}, []);

    function logout (){
      localStorage.removeItem("authTokenUser");
      navigate("/")
    }

  return (
    <div>
      <div className='top1'>
        <div className='firstSection'>Welcome to the Acme Online support</div>
        <div className='SecondSection'>
          <div onClick={() => navigate("/user_home")}> <button style={{backgroundColor:"rgb(139, 146, 146)",color:"black", border:"None"}}>Home</button> </div>
          <div onClick={() => navigate("/user_ticket")}> <button style={{backgroundColor:"rgb(139, 146, 146)",color:"black", border:"None"}}>Token</button></div>
          <div onClick={logout}> <button style={{backgroundColor:"rgb(139, 146, 146)",color:"black", border:"None"}}>Log Out</button> </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNav
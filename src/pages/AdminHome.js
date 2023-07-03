import React from 'react'
import AdminWelcome from '../Components/Admin/Home/AdminWelcome'
import AdminNav from '../Components/Admin/Navbar/AdminNav'


function AdminHome() {
  return (
    <div>
        <AdminNav/>
        <AdminWelcome/>
    </div>
  )
}

export default AdminHome
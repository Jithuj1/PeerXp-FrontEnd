import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import AdminLogin from './Components/Admin/Login/AdminLogin';
import Users from './pages/Users';
import Department from './pages/Department';
import AddNewDepartment from './Components/Admin/Department/AddNewDepartment';
import AddNewUser from './Components/Admin/Users/AddNewUser';
import UserHome from './pages/UsersHome'
import UserLogin from './Components/Users/Login/UserLogin'
import AdminTicket from './pages/AdminTicket';
import AddNewTicketAdmin from './Components/Admin/Ticket/AddNewTicket'
import UserTicket from './pages/UserTicket';
import AddNewTicketUser from './Components/Users/Ticket/AddTicketUser';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="admin/" element={<AdminHome />}></Route>
          <Route path="admin_login/" element={<AdminLogin />}></Route>
          <Route path="users/" element={<Users />}></Route>
          <Route path="department/" element={<Department />}></Route>
          <Route path="add_dept/" element={<AddNewDepartment />}></Route>
          <Route path="add_user/" element={<AddNewUser />}></Route>
          <Route path="user_home/" element={<UserHome />}></Route>
          <Route path="user_login/" element={<UserLogin />}></Route>
          <Route path="admin_ticket/" element={<AdminTicket />}></Route>
          <Route path="admin_add_ticket/" element={<AddNewTicketAdmin />}></Route>
          <Route path="user_ticket/" element={<UserTicket />}></Route>
          <Route path="user_add_ticket/" element={<AddNewTicketUser />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react'
import AdminNav from '../Navbar/AdminNav'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNewTicket() {
    const navigate = useNavigate()
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState('');
    const [users, setUsers] = useState([]);
    const [ticketUser,setTicketUser] = useState();

    useEffect(() => {
        const token = localStorage.getItem("authTokenAdmin");
        axios
          .get("http://127.0.0.1:8000/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setUsers(res.data);
          });
      }, []);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authTokenAdmin')
        console.log(subject, body, priority, ticketUser)
        axios.post('http://127.0.0.1:8000/ticket',{
            subject:subject,
            body:body,
            priority:priority,
            user:ticketUser
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }).then((res)=>{
                console.log(res)
                if (res.statusText==="Accepted"){
                    navigate('/admin_ticket');
                }
            }).catch(()=>{alert("Enter Proper Details")})
    }
  return (
    <div>
        <AdminNav/>
        <div>
        <div className='tableTop'>
            <div className='tableMain'>
            <form className='registration_form_user'>
            <input value={subject} onChange={(e)=>{setSubject(e.target.value)}} placeholder='Subject of ticket' />
            <input value={body} onChange={(e)=>{setBody(e.target.value)}} placeholder='Body of ticket' />
            <input value={priority} onChange={(e)=>{setPriority(e.target.value)}} placeholder='Priority' />
            <select style={{marginTop:".5rem"}} className='selectBox' onChange={(e)=>{setTicketUser(e.target.value)}}>
            <option value="volvo">Select User</option>
            {users &&
            users.map((user)=>{
                return(
                    <option value={user.id}>{user.name}, {user.email}</option>
                )
            })
            }
            </select>
            <button style={{marginTop:"1rem"}} onClick={onHandleSubmit}>Submit</button>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddNewTicket
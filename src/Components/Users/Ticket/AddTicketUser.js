import React, { useEffect } from 'react'
import UserNav from '../Navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';


function AddTicketUser() {
    const navigate = useNavigate()
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState('');
    const [ticketUser,setTicketUser] = useState();

    const decodeJWT = (token) => {
        try {
          const decodedToken = jwt.decode(token);
          return decodedToken;
        } catch (error) {
          console.log('Error decoding JWT:', error);
          return null;
        }
      };

    useEffect(() => {
        const token = localStorage.getItem("authTokenUser");
        const cleanedToken = token.replace(/^"|"$/g, '');
        const decodedToken = decodeJWT(cleanedToken);
        if (decodedToken) {
            setTicketUser(decodedToken['user_id'])
          }
      }, []);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authTokenUser')
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
                    navigate('/user_ticket');
                }
            }).catch(()=>{alert("Enter Proper Details")})
    }
  return (
    <div>
        <UserNav/>
        <div>
        <div className='tableTop'>
            <div className='tableMain'>
            <form className='registration_form_user'>
            <input value={subject} onChange={(e)=>{setSubject(e.target.value)}} placeholder='Subject of ticket' />
            <input value={body} onChange={(e)=>{setBody(e.target.value)}} placeholder='Body of ticket' />
            <input value={priority} onChange={(e)=>{setPriority(e.target.value)}} placeholder='Priority' />
            <button style={{marginTop:"1rem"}} onClick={onHandleSubmit}>Submit</button>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddTicketUser
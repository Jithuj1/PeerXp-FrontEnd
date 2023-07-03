import React, { useEffect } from 'react'
import AdminNav from '../Navbar/AdminNav'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';


function AddNewUser() {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dip, setDip] = useState();
    const [departments, setDepartments] = useState([])
    const [adminId,setAdminId] = useState();

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
        const token = localStorage.getItem("authTokenAdmin");
        const cleanedToken = token.replace(/^"|"$/g, '');
        const decodedToken = decodeJWT(cleanedToken);
        if (decodedToken) {
            setAdminId(decodedToken['user_id'])
          }
        axios
          .get("http://127.0.0.1:8000/department", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setDepartments(res.data);
          });
    }, [])
    

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authTokenAdmin')
        axios.post('http://127.0.0.1:8000/users',{
            name:name,
            phone:phone,
            email:email,
            department:dip,
            password:password,
            created_by:adminId
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }).then((res)=>{
                console.log(res)
                if (res.statusText==="Accepted"){
                    navigate('/users');
                }
            }).catch(()=>{alert("Enter Proper Details")})
    }

  return (
    <div>
        <AdminNav/>
        <div className='tableTop'>
            <div className='tableMain'>
            <form className='registration_form_user'>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name' />
            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder='Phone' />
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' />
            <select className='selectBox' onChange={(e)=>{setDip(e.target.value)}}>
            <option value="volvo">Select Department</option>
            {departments &&
            departments.map((dept)=>{
                return(
                    <option value={dept.id}>{dept.dept_name}</option>
                )
            })
            }
            </select>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='password'/>
            <button onClick={onHandleSubmit}>Submit</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default AddNewUser
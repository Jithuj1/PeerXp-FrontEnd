import React from 'react'
import AdminNav from '../Navbar/AdminNav'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';


function AddNewDepartment() {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
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
      }, []);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authTokenAdmin')
        console.log(token)
        axios.post('http://127.0.0.1:8000/department',{
            dept_name:name,
            dept_description:des,
            created_by:adminId},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }).then((res)=>{
                console.log(res.statusText)
                if (res.statusText==="OK"){
                    navigate('/department');
                }
            }).catch(()=>{alert("Wrong password")})
    }

  return (
    <div>
        <AdminNav />
        <div className='tableTop'>
            <div className='tableMain'>
            <form className='registration_form_user'>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Department Name' />
            <input value={des} onChange={(e)=>{setDes(e.target.value)}} placeholder='Description'/>
            <button onClick={onHandleSubmit}>Submit</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default AddNewDepartment
import React from "react";
import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const navigate = useNavigate ()
  const [userName, setUserName] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const decodeJWT = (token) => {
    try {
      const decodedToken = jwt.decode(token);
      return decodedToken;
    } catch (error) {
      console.log("Error decoding JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authTokenUser");
    if (!token){
      console.log('here')
      navigate("/user_login")
      return;}
    const cleanedToken = token.replace(/^"|"$/g, "");
    const decodedToken = decodeJWT(cleanedToken);
    console.log(decodedToken)
    if (decodedToken) {
      setCurrentUser(decodedToken["user_id"]);
    }
    axios
      .get(
        `http://127.0.0.1:8000/users/${decodedToken["user_id"]}`,).then((res) => {
          console.log(res);
        if (res.statusText === "OK") {
          console.log('her')
          setUserName(res.data)
        }
      })
      .catch(() => {
      });
  }, []);

  return <div>
    <h1 style={{marginTop:"5rem"}}> Welcome {userName.name}</h1>
  </div>;
}

export default UserHome;

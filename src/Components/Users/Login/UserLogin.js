import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'

function AdminLogin() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const takeText = (e) => {
    setText(e.target.value);
  };

  const takePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/users/auth", {
        email_or_phone: text,
        password: password,
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem(
            "authTokenUser",
            JSON.stringify(response.data["token"])
          );
          navigate("/user_home");
        }
      }).catch(()=>{alert("Wrong Credentials")})
  };
  return (
    <div>
      <div className="LoginPageHeader">
        <div class="container" id="container">
            <form className="userLoginFormCustom">
              <h1>Sign in</h1>

              <input
                type="text"
                placeholder="Email or phone number"
                value={text}
                onChange={takeText}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={takePassword}
              />
              <a href="#">Forgot your password?</a>
              <button className="button_class" onClick={handleSubmit}>Sign In</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

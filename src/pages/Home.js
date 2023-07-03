import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div class="welcome">Welcome to Acme Online Support</div>
      <div class="btns">
        <div class="btn1" onClick={() => navigate("/admin")}>
          For Admin
        </div>
        <div class="btn1" onClick={() => navigate("/user_home")}>for Users</div>
      </div>
    </div>
  );
}

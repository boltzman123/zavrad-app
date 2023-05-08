import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginFormCSS from "../styles/components/LoginForm.module.css";
import { toast } from 'react-toastify';


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://192.168.1.6:3001/login", {
        email,
        password,
      });
      console.log(res.data);
      var user=res.data;
      window.localStorage.setItem('user', JSON.stringify(user.email));
      if (user.email == "admin") {
        window.localStorage.setItem('isAdmin', "true");
      }
      navigate('/home');

    } catch (error) {
      alert(error);

    }
  };

  return (
    <div className="container-fluid bg-white d-flex align-items-center justify-content-center vh-100">
      <div className="col-lg-4 col-md-6 col-sm-8 col-10 p-4 rounded-lg bg-light shadow">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
        
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-space-evenly align-items-center">
            <button type="submit" className="btn btn-primary mt-3">
              Login
            </button>
            <div className="ml-3" style={{padding: "30px"}}>
              <a href="/registration">Register</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Login.css'
import Navbar from "../Navbar/Navbar";
import {backendUrl} from "../constants.js";
// import noimg from './noimg.jpg'




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('dsa');

  const togglePass = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMsg('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      setErrorMsg('Please enter your email');
      return;
    } else if (password === '') {
      setErrorMsg('Please enter your password');
      return;
    } else if (!isValidEmail(email)) {
      setErrorMsg('Please enter a valid email');
      return;
    } else {
      setErrorMsg('');
      // Perform your form submission here
    }
  };

  const isValidEmail = (email) => {
    // Email validation logic using a regular expression
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <div className="entirebody">
    <div className="login-body" id="particles-js"></div>
    <div className="animated bounceInDown">
      <div className="login-container">
        <span className="error animated tada" id="msg">
          {errorMsg}
        </span>
        <form name="form1" className="box" onSubmit={handleSubmit}>
          <h4>
            Admin<span>Panel</span>
          </h4>
          <h5>Sign in to your account.</h5>
          <input
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
          />
          <i
            className={`typcn typcn-eye ${showPassword ? 'active' : ''}`}
            id="eye"
            onClick={togglePass}
          ></i>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={handlePasswordChange}
          />

          <input type="submit" value="Sign in" className="btn1" />
        </form>
        <a href="#" className="dnthave">
          Don’t have an account? Sign up
        </a>
      </div>
      <div className="footer">
        <span>
          Made <a href="https://github.com/Ravitejareddy-s">By Ravi Teja</a>
        </span>
      </div>
    </div>
  </div>
  )
}






export default Login



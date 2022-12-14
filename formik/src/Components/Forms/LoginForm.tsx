import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./SimpleForm.css";
import { registerUser, loginUser } from "../../store/slices/usersSlice";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AsyncLocalStorage } from "async_hooks";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";



const LoginForm = () => {

    const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
    const users = useSelector((state: RootState) => state.usersSlice.users);
    const  status = useSelector((state: RootState) => state.usersSlice.status);


    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
  
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
  
    const [email, setEmail] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
  
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false); 
    const navigate = useNavigate();



  const handleFocusEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    console.log(email);
  };
  const handleFocusPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
    console.log(pwd);
  };
const handleSubmit = ( e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault();
    dispatch(loginUser({email: email, password: pwd} ))
}

useEffect(() => {
    if(status === 'succeeded') {
        navigate('/tasks');
    }
}, [status] )

  return (
    <>
      <h1>Login</h1>
      {status == 'loading' && <p>Loading...</p>}
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            required
            placeholder="email"
            onChange={handleFocusEmail}
            type="email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            placeholder="password"
            type="password"
            onChange={handleFocusPassword}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
    </>
  );
};

export default LoginForm;

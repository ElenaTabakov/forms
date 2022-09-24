import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './SimpleForm.css';
import { registerUser, loginUser } from "../../store/slices/usersSlice";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;



const RgisterForm = () => {

  const users = useSelector((state: RootState) => state.usersSlice.users);
  const status = useSelector((state: RootState) => state.usersSlice.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const userRef = useRef();
  //   const errRef = useRef();

  const [user, setUser] = useState("");
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

  //    useEffect (() => {
  //     useRef.current.focus();
  //    } , []);

  const handleFocusUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser(e.target.value);
    console.log(user);
  };
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
  // const register = async () => {
  //   try {
  //     const response = await axiosApi.post("users/register", {
  //       email: email,
  //       password: pwd,
  //       name: user,
  //     });
  //     console.log(response);
  //     console.log(response?.data);
  //   } catch (err) {
  //     console.log("errror");
  //   }
  // };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !email || !pwd) {
      console.log("Empty data");
      return;
    }

    dispatch(registerUser({ email: email, password: pwd,name: user }));
    {status == 'succeeded' && navigate('/login')}
   
  };

  // const login = async () => {
  //   try {
  //     const response = await axios.post("users/login", {
  //       email: "a22@gmail.com",
  //       password: "123456",
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   login();
  // }, []);

  return (
    <section>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username: 
          <input
            id="username"
            autoComplete="off"
            required
            placeholder="username"
            type="text"
            onChange={handleFocusUserName}
          />
        </label>
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
    </section>
  );
};

export default RgisterForm;

import React from "react";
import { Link } from "react-router-dom";
import RgisterForm from "../Components/Forms/RgisterForm";

const Register = () => {
  return (
    <>
      <h1>Register</h1>
      <RgisterForm />
      <br />
      <Link to='/login' >Login</Link>
    </>
  );
};

export default Register;

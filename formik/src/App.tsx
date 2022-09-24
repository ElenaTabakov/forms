import React from 'react';
import './App.css';
import * as S from './App.styles'
import LoginForm from './Components/Forms/LoginForm';
import { Link } from 'react-router-dom';

function App() {
  return (
    <S.PageWrapper>
      <Link to="/register" className='links'>Register</Link>
      <Link to="/login"  className='links'>Login</Link>
      {/* <RgisterForm/> */}
      <LoginForm/>
    </S.PageWrapper>
  );
}

export default App;

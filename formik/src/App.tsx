import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleForm from './Components/Forms/SimpleForm';
import * as S from './App.styles'
import ConditionalFrom from './Components/Forms/ConditionalFrom';
import RgisterForm from './Components/Forms/RgisterForm';
import LoginForm from './Components/Forms/LoginForm';

function App() {
  return (
    <S.PageWrapper>
      <RgisterForm/>
      <LoginForm/>
            {/* <SimpleForm /> */}
      {/* <ConditionalFrom /> */}
    </S.PageWrapper>
  );
}

export default App;

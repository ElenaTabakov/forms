import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleForm from './Components/Forms/SimpleForm';
import * as S from './App.styles'
import ConditionalFrom from './Components/Forms/ConditionalFrom';

function App() {
  return (
    <S.PageWrapper>
      <SimpleForm />
      <ConditionalFrom />
    </S.PageWrapper>
  );
}

export default App;

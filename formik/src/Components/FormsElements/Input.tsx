import React from 'react';
import * as S from "./Input.slyles"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  
}

 const Input = ( {...rest} : InputProps ) => {
  return (
   <S.Input {...rest}/>
  )
}
export default Input;
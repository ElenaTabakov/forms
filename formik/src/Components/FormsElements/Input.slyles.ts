import styled from "styled-components";

export const Input = styled.input `
  border-radius: 10px;
  border-width: 1px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 15px;

  &:active,
  &:focus {
    border-width: 2px;
    border-color: lightblue;
  }
`;

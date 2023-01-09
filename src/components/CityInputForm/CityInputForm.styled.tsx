import styled from "styled-components";
import { colors } from "../../theme/colors";

const { mainLight, lightAccent, darkest } = colors;

export const Form = styled.form`
  position: fixed;
  top: 10%;
  left: 0;
  width: 250px;
  padding: 20px 20px 20px 30px;
  border-radius: 0 20px 20px 0;
  background-color: ${mainLight};
  transition: transform 400ms;
  border: 1px dotted ${darkest};

  @media screen and (min-width: 480px) {
    width: 300px;
    padding: 30px 30px 30px 40px;
  }
`;

export const Input = styled.input`
  width: 80%;
  padding: 5px 10px;
  border: 2px inset ${lightAccent};
  border-radius: 10px;
  margin-bottom: 10px;
  @media screen and (min-width: 480px) {
    font-size: 20px;
  }
`;

export const Label = styled.label`
  display: block;
  transform: translate(10px, -36px);
  font-size: 14px;
  margin-bottom: 5px;
  transition: transform 300ms;

  ${Input}:not(:placeholder-shown) + &,
  ${Input}:focus + & {
    transform: translate(0, 0);
  }

  @media screen and (min-width: 480px) {
    font-size: 20px;
    transform: translate(10px, -42px);
  }
`;

export const Submit = styled.button`
  padding: 5px 20px;
  color: ${lightAccent};
  background-color: ${darkest};
  border-radius: 14px;
  min-width: 110px;
  border: 2px solid ${lightAccent};
  transition-property: color, background-color, border;
  transition-duration: 250ms;
  cursor: pointer;

  &:focus,
  &:hover {
    color: ${darkest};
    background-color: ${lightAccent};
    border: 2px solid ${darkest};
  }

  @media screen and (min-width: 480px) {
    font-size: 16px;
  }
`;

export const Hide = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${mainLight};
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  @media screen and (min-width: 480px) {
    font-size: 20px;
  }
`;

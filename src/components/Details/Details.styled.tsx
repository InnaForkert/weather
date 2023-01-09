import styled from "styled-components";
import { Submit } from "../CityInputForm/CityInputForm.styled";

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  text-align: right;
  padding-bottom: 40px;
  padding-inline: 15px;

  @media screen and (min-width: 480px) {
    padding-inline: 35px;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding-top: 40px;
  }
`;

export const DetailsHeading = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

export const CityName = styled.h1`
  text-align: right;
`;

export const BackToAll = styled(Submit)`
  display: block;
  margin: 0 auto;
  cursor: pointer;
`;

export const Button = styled.button``;
export const WeatherIcon = styled.img``;
export const Temp = styled.p``;
export const Description = styled.p``;
export const Detail = styled.p``;

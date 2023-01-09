import styled from "styled-components";
import { colors } from "../../theme/colors";
import { Submit } from "../CityInputForm/CityInputForm.styled";

export const CardContainer = styled.div`
  background-color: ${colors.mainLight};
  padding: 20px;
  border-radius: 14px;
  border: 1px dotted ${colors.darkest};
  text-align: center;
`;

export const WeatherIcon = styled.img`
  display: block;
  margin-inline: auto;
`;

export const Temp = styled.p`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const CityName = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
`;

export const Delete = styled(Submit)`
  background-color: ${colors.darkAccent};
  border-color: ${colors.darkest};
  color: ${colors.darkest};
  margin-left: 5px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${colors.darkest};
    border-color: ${colors.darkAccent};
    color: ${colors.darkAccent};
  }

  @media screen and (min-width: 480px) {
    font-size: 16px;
  }
`;

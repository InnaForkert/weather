import styled from "styled-components";
import { colors } from "../../theme/colors";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${colors.darkest};
  color: ${colors.darkAccent};
  padding: 10px;
`;

export const Logo = styled.p`
  @media screen and (min-width: 480px) {
    font-size: 20px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 24px;
  }
`;

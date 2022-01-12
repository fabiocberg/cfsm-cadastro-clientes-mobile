import styled from "styled-components/native";

export interface TitleProps {
  big?: boolean;
  marginVertical?: number;
}

export const Title = styled.Text<TitleProps>`
  font-weight: bold;
  font-size: ${(props) => (props.big ? 26 : 16)}px;
  margin: ${(props) => props.marginVertical || 0}px 0px;
`;

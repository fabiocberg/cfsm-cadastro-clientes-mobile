import styled from "styled-components/native";

export interface RightProps {
  mb?: number;
}

export const Right = styled.View<RightProps>`
  align-items: flex-end;
  margin-bottom: ${(props) => props.mb || 0}px;
`;

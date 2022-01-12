import styled from "styled-components/native";

export interface CenterProps {
  mb?: number;
}
export const Center = styled.View<CenterProps>`
  align-items: center;
  margin-bottom: ${(props) => props.mb || 0}px;
`;

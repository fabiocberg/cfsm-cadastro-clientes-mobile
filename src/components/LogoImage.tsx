import styled from "styled-components/native";

import logo from "../../assets/images/logo.png";

export interface LogoImageProps {
  size: number;
}

const MyImage = styled.Image<LogoImageProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

export default function LogoImage(props: LogoImageProps) {
  return <MyImage source={logo} size={props.size} resizeMode="contain" />;
}

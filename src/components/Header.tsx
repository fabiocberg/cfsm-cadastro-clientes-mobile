import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import LogoImage from "./LogoImage";
import { Title } from "./Title";

const verticalPadding = 8;

const Container = styled.View`
  width: 100%;
  background-color: #fff;
  padding: ${verticalPadding}px 0px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: ${Platform.select({ ios: 30, android: 40, web: 0 })}px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface HeaderProps {
  onLogout: () => void;
}

export default function Header(props: HeaderProps) {
  return (
    <Container style={styles.container}>
      <View />
      <TitleContainer>
        <LogoImage size={40} />
        <Title style={styles.title} marginVertical={16}>
          Cadastro de Clientes
        </Title>
      </TitleContainer>
      <TouchableOpacity onPress={() => props.onLogout()}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    marginLeft: 6,
  },
});

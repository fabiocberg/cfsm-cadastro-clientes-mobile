import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { BoxView } from "../components/BoxView";
import { Center } from "../components/Center";

import LogoImage from "../components/LogoImage";
import { Title } from "../components/Title";
import Input from "../components/Input";
import { Right } from "../components/Right";
import Button from "../components/Button";
import { CommonActions, useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default function SignIn() {
  const navigation = useNavigation();

  const register = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "SignUp",
      })
    );
  };

  const signIn = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "Home",
      })
    );
  };

  return (
    <Container>
      <BoxView marginHorizontal={32}>
        <Center>
          <LogoImage size={80} />
          <Title marginVertical={16} big>
            Cadastro de Clientes
          </Title>
        </Center>
        <Input
          mb={16}
          iconName="alternate-email"
          placeholder="Endereço de email"
        />
        <Input mb={16} iconName="lock" placeholder="Senha" />
        <Right mb={16}>
          <TouchableOpacity>
            <Text style={{ color: "#718096" }}>esqueceu a senha?</Text>
          </TouchableOpacity>
        </Right>
        <Button mb={16} onPress={signIn}>
          Login
        </Button>
        <Center mb={16}>
          <Text>Ainda não possui cadastro?</Text>
        </Center>
        <Button link onPress={register}>
          Cadastrar-se
        </Button>
      </BoxView>
    </Container>
  );
}

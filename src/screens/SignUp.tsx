import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { BoxView } from "../components/BoxView";
import { Center } from "../components/Center";

import LogoImage from "../components/LogoImage";
import { Title } from "../components/Title";
import Input from "../components/Input";
import { Right } from "../components/Right";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default function SignUp() {
  const navigation = useNavigation();

  const cancel = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <BoxView marginHorizontal={32}>
        <Center>
          <LogoImage size={80} />
          <Title marginVertical={16} big>
            Cadastrar-se
          </Title>
        </Center>
        <Input
          mb={16}
          iconName="person"
          placeholder="Nome"
          autoCapitalize="words"
        />
        <Input
          mb={16}
          iconName="alternate-email"
          placeholder="Endereço de email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input mb={16} iconName="lock" placeholder="Senha" secureTextEntry />
        <Input
          mb={16}
          iconName="lock"
          placeholder="Confirmar senha"
          secureTextEntry
        />
        {/* Botões */}
        <Button mb={16}>Cadastrar</Button>
        <Button link onPress={cancel}>
          Voltar
        </Button>
      </BoxView>
    </Container>
  );
}

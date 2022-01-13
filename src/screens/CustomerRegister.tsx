import { MaterialIcons } from "@expo/vector-icons";
import { StackActions, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { BoxView } from "../components/BoxView";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";

const Container = styled.View`
  background-color: #e2e8f0;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export default function CustomerRegister() {
  const navigation = useNavigation();
  const logout = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <Container>
      <Header onLogout={logout} />
      <BoxView
        marginHorizontal={16}
        marginTop={16}
        padding={16}
        shadow
        borderRadius={8}
      >
        <MaterialIcons
          style={{ marginBottom: 8 }}
          name="account-circle"
          size={50}
          color="#38A169"
        />
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
        <Input
          mb={16}
          iconName="phone"
          placeholder="Telefone"
          keyboardType="numeric"
          autoCapitalize="none"
        />
        {/* Botões */}
        <Button mb={16}>Salvar</Button>
        <Button link onPress={() => navigation.goBack()}>
          Voltar
        </Button>
      </BoxView>
    </Container>
  );
}

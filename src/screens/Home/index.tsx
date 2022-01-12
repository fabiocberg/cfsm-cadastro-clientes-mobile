import styled from "styled-components/native";
import { BoxView } from "../../components/BoxView";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Customer } from "../../models/customer-model";
import CustomerList from "./CustomerList";
import fabImage from "../../../assets/images/fab.png";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

const Container = styled.View`
  background-color: #e2e8f0;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const fabSize = 70;

const Fab = styled.Image`
  position: absolute;
  z-index: 10;
  width: ${fabSize}px;
  height: ${fabSize}px;
  right: ${-fabSize}px;
  bottom: ${-fabSize}px;
`;

const customers: Customer[] = [
  { id: 1, name: "Cliente 1", email: "", phone: "", userId: 0, pictureUrl: "" },
  { id: 2, name: "Cliente 2", email: "", phone: "", userId: 0, pictureUrl: "" },
  { id: 3, name: "Cliente 3", email: "", phone: "", userId: 0, pictureUrl: "" },
  { id: 4, name: "Cliente 4", email: "", phone: "", userId: 0, pictureUrl: "" },
];

export default function Home() {
  const navigation = useNavigation();
  const logout = () => {
    navigation.goBack();
  };

  const registerClient = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "CustomerRegister",
      })
    );
  };

  return (
    <Container>
      <Header onLogout={logout} />
      {/* Barra busca */}
      <BoxView
        marginHorizontal={16}
        marginTop={16}
        padding={16}
        shadow
        borderRadius={8}
      >
        <Input iconName="search" placeholder="Buscar" />
      </BoxView>
      {/* Lista de clientes */}
      <CustomerList customers={customers} />
      <TouchableOpacity style={styles.fab} onPress={registerClient}>
        <Image source={fabImage} style={styles.fabImage} />
      </TouchableOpacity>
    </Container>
  );
}

const fabAlign = 16;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: fabAlign,
    bottom: fabAlign,
  },
  fabImage: {
    width: fabSize,
    height: fabSize,
  },
});

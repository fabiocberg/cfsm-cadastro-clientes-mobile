import styled from "styled-components/native";
import { BoxView } from "../../components/BoxView";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Customer } from "../../models/customer-model";
import CustomerList from "./CustomerList";
import fabImage from "../../../assets/images/fab.png";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import getEnvVars from "../../../environments";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

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

export default function Home() {
  const navigation = useNavigation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const logout = () => {
    navigation.goBack();
  };

  const updateList = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(`${getEnvVars().apiUrl}/v1/customers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.ok) {
          setCustomers(json.customers || []);
        } else {
          console.log("Error", json.message);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    updateList();
    const focusListener = navigation.addListener("focus", () => {
      updateList();
    });
    return focusListener;
  }, []);

  const registerClient = (customer?: Customer) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "CustomerRegister",
        params: {
          customer,
        },
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
      <CustomerList
        customers={customers}
        onEditing={(customer) => registerClient(customer)}
      />
      <TouchableOpacity style={styles.fab} onPress={() => registerClient()}>
        <Image source={fabImage} style={styles.fabImage} />
      </TouchableOpacity>
    </Container>
  );
}

const fabAlign = 16;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    zIndex: 100,
    elevation: 20,
    right: fabAlign,
    bottom: fabAlign,
  },
  fabImage: {
    width: fabSize,
    height: fabSize,
  },
});

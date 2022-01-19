import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import getEnvVars from "../../environments";
import { BoxView } from "../components/BoxView";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { Customer } from "../models/customer-model";

const Container = styled.View`
  background-color: #e2e8f0;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export default function CustomerRegister() {
  const navigation = useNavigation();
  // @ts-ignore
  const { customer } = useRoute().params;
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(
    customer
  );
  const [file, setFile] = useState();

  const { register, setValue, handleSubmit } = useForm();

  console.log(editingCustomer);

  useEffect(() => {
    register("name");
    register("email");
    register("phone");
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
  }, [register]);

  const logout = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const savePicture = (id: number) => {
    navigation.goBack();
  };

  const save = async (data: any) => {
    const method = editingCustomer && editingCustomer.id > 0 ? "PUT" : "POST";
    if (method === "PUT") {
      data.id = editingCustomer?.id;
      data.name = data.name || editingCustomer?.name || "";
      data.email = data.email || editingCustomer?.email || "";
      data.phone = data.phone || editingCustomer?.phone || "";
    }
    const token = await AsyncStorage.getItem("token");
    fetch(`${getEnvVars().apiUrl}/v1/customers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.ok) {
          setEditingCustomer(null);
          // setValue("name", "");
          // setValue("email", "");
          // setValue("phone", "");
          if (file) {
            savePicture(json.updated.id);
          } else {
            navigation.goBack();
          }
        } else {
          console.log("Error", json.message);
        }
      })
      .catch((e) => console.log(e));
  };

  console.log("editingCustomer", editingCustomer);

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
          name="name"
          setValue={setValue}
          initialValue={editingCustomer?.name || ""}
        />
        <Input
          mb={16}
          iconName="alternate-email"
          placeholder="Endereço de email"
          keyboardType="email-address"
          autoCapitalize="none"
          name="email"
          setValue={setValue}
          initialValue={editingCustomer?.email || ""}
        />
        <Input
          mb={16}
          iconName="phone"
          placeholder="Telefone"
          keyboardType="numeric"
          autoCapitalize="none"
          name="phone"
          setValue={setValue}
          initialValue={editingCustomer?.phone || ""}
        />
        {/* Botões */}
        <Button mb={16} onPress={handleSubmit(save)}>
          Salvar
        </Button>
        <Button link onPress={() => navigation.goBack()}>
          Voltar
        </Button>
      </BoxView>
    </Container>
  );
}

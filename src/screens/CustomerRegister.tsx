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
import CustomerPicture from "../components/CustomerPicture";
import Header from "../components/Header";
import Input from "../components/Input";
import { Customer } from "../models/customer-model";
import * as ImagePicker from "expo-image-picker";

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
  const [file, setFile] = useState<string>();

  const { register, setValue, handleSubmit } = useForm();

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

  const onSelectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(result);

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };

  const savePicture = async (id: number) => {
    if (!file) {
      navigation.goBack();
      return;
    }
    const filename = file.split("/").pop()!;
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image";

    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();
    // @ts-ignore
    formData.append("file", { uri: file, name: filename, type });
    formData.append("id", id.toString());
    fetch(`${getEnvVars().apiUrl}/v1/customers/profile-picture`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.ok) {
          navigation.goBack();
        } else {
          console.log(json);
        }
      })
      .catch((e) => console.log(e));
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
        <CustomerPicture
          customer={editingCustomer}
          pictureUri={file}
          onSelectPicture={onSelectPicture}
          mb={8}
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

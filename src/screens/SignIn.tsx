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
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ErrorText = styled.Text`
  color: #ff3333;
  text-align: center;
  margin-bottom: 8px;
`;

export default function SignIn() {
  const navigation = useNavigation();
  const { register, setValue, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    register("email");
    register("password");
    setValue("email", "");
    setValue("password", "");
  }, [register]);

  const signUp = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "SignUp",
      })
    );
  };

  const signIn = (data: any) => {
    setErrorMessage("");
    fetch("http://192.168.0.9:3001/v1/sign-in", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.ok) {
          await AsyncStorage.setItem("token", json.token);
          navigation.dispatch(
            CommonActions.navigate({
              name: "Home",
            })
          );
        } else {
          setErrorMessage(json.message);
        }
      })
      .catch((e) => setErrorMessage(e));
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
          name="email"
          setValue={setValue}
        />
        <Input
          mb={16}
          iconName="lock"
          placeholder="Senha"
          name="password"
          setValue={setValue}
          secureTextEntry
        />
        <Right mb={16}>
          <TouchableOpacity>
            <Text style={{ color: "#718096" }}>esqueceu a senha?</Text>
          </TouchableOpacity>
        </Right>
        {/* Mensagem de erro */}
        {errorMessage.length > 0 ? <ErrorText>{errorMessage}</ErrorText> : null}
        <Button mb={16} onPress={handleSubmit(signIn)}>
          Login
        </Button>
        <Center mb={16}>
          <Text>Ainda não possui cadastro?</Text>
        </Center>
        <Button link onPress={signUp}>
          Cadastrar-se
        </Button>
      </BoxView>
    </Container>
  );
}

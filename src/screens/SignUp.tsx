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
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import getEnvVars from "../../environments";

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

export default function SignUp() {
  const navigation = useNavigation();
  const { register, setValue, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    register("name");
    register("email");
    register("password");
    register("passwordConfirm");
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
    setValue("passwordConfirm", "");
  }, [register]);

  const signUp = (data: any) => {
    setErrorMessage("");
    if (data.name.trim().length === 0) {
      setErrorMessage("Informe o seu nome.");
      return;
    }
    if (data.email.trim().length === 0) {
      setErrorMessage("Informe o seu email.");
      return;
    }
    if (data.password) {
      if (data.password !== data.passwordConfirm) {
        setErrorMessage("As senhas não são iguais.");
        return;
      }
    } else {
      setErrorMessage("Informe uma senha.");
      return;
    }
    delete data["passwordConfirm"];
    fetch(`${getEnvVars().apiUrl}/v1/sign-up`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.ok) {
          navigation.goBack();
        } else {
          setErrorMessage(json.message);
        }
      })
      .catch((e) => setErrorMessage(e));
  };

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
          name="name"
          setValue={setValue}
        />
        <Input
          mb={16}
          iconName="alternate-email"
          placeholder="Endereço de email"
          keyboardType="email-address"
          autoCapitalize="none"
          name="email"
          setValue={setValue}
        />
        <Input
          mb={16}
          iconName="lock"
          placeholder="Senha"
          secureTextEntry
          name="password"
          setValue={setValue}
        />
        <Input
          mb={16}
          iconName="lock"
          placeholder="Confirmar senha"
          secureTextEntry
          name="passwordConfirm"
          setValue={setValue}
        />
        {/* Mensagem de erro */}
        {errorMessage.length > 0 ? <ErrorText>{errorMessage}</ErrorText> : null}
        {/* Botões */}
        <Button mb={16} onPress={handleSubmit(signUp)}>
          Cadastrar
        </Button>
        <Button link onPress={cancel}>
          Voltar
        </Button>
      </BoxView>
    </Container>
  );
}

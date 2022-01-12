import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardTypeOptions, TextInput } from "react-native";

const Container = styled.View`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px;
  flex-direction: row;
  align-items: center;
`;

const MyTextInput = styled.TextInput`
  margin-left: 8px;
  flex-grow: 1;
`;

export interface InputProps {
  placeholder?: string;
  iconName?: any;
  mb?: number;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  secureTextEntry?: boolean | undefined;
}

export default function Input(props: InputProps) {
  return (
    <Container style={{ marginBottom: props.mb || 0 }}>
      <MaterialIcons name={props.iconName} size={18} color="#E2E8F0" />
      <MyTextInput
        placeholder={props.placeholder}
        placeholderTextColor="#E2E8F0"
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        secureTextEntry={props.secureTextEntry}
      />
    </Container>
  );
}

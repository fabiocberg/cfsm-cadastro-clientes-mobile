import React from "react";
import { Text, TouchableOpacity } from "react-native";

export interface ButtonProps {
  link?: boolean;
  children: React.ReactNode;
  mb?: number;
  onPress?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.link ? "transparent" : "#38A169",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 8,
        marginBottom: props.mb || 0,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{ color: props.link ? "#38A169" : "#fff", fontWeight: "bold" }}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

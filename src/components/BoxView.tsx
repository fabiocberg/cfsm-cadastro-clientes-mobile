import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get("window").width;

export interface BoxViewProps {
  marginHorizontal?: number;
  marginTop?: number;
  padding?: number;
  borderRadius?: number;
  shadow?: boolean;
  children: React.ReactNode;
}

export const MyView = styled.View<BoxViewProps>`
  width: ${(props) => screenWidth - (props.marginHorizontal || 0)}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  padding: ${(props) => props.padding || 0}px;
  background-color: #fff;
`;

export function BoxView(props: BoxViewProps) {
  return (
    <MyView style={props.shadow ? styles.container : null} {...props}>
      {props.children}
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

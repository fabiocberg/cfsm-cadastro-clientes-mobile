import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { BoxView } from "../../components/BoxView";
import { Customer } from "../../models/customer-model";

const Line = styled.View`
  height: 1px;
  background-color: #e2e8f0;
  margin-bottom: 8px;
`;

const CustomerItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

interface CustomerListProps {
  customers: Customer[];
}

export default function CustomerList(props: CustomerListProps) {
  return (
    <BoxView
      marginHorizontal={16}
      marginTop={16}
      padding={16}
      shadow
      borderRadius={8}
    >
      {props.customers ? (
        props.customers.map((customer) => (
          <View key={customer.id}>
            <CustomerItem>
              <MaterialIcons name="account-circle" size={50} color="#38A169" />
              <Text style={{ marginLeft: 8 }}>{customer.name}</Text>
            </CustomerItem>
            <Line />
          </View>
        ))
      ) : (
        <Text>Sem item para exibir</Text>
      )}
    </BoxView>
  );
}

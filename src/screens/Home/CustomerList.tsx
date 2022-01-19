import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { BoxView } from "../../components/BoxView";
import { Customer } from "../../models/customer-model";

const Line = styled.View`
  height: 1px;
  background-color: #e2e8f0;
  margin-bottom: 8px;
`;

const CustomerItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

interface CustomerListProps {
  customers: Customer[];
  onEditing?: (customer: Customer) => void;
}

export default function CustomerList(props: CustomerListProps) {
  const handleEditing = (customer: Customer) => {
    if (props.onEditing) {
      props.onEditing(customer);
    }
  };

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
            <CustomerItem onPress={() => handleEditing(customer)}>
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

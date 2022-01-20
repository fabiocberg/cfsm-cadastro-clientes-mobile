import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Customer } from "../models/customer-model";

interface CustomerPictureProps {
  pictureUri?: string | undefined | null;
  customer: Customer | null | undefined;
  onSelectPicture?: () => void;
  mb?: number;
}

const profileImageSize = 50;

const ProfileImage = styled.Image`
  width: ${profileImageSize}px;
  height: ${profileImageSize}px;
  border-radius: ${profileImageSize / 2}px;
`;

export default function CustomerPicture(props: CustomerPictureProps) {
  const getProfileUri = (): string => {
    if (props.pictureUri) {
      return props.pictureUri;
    } else if (props.customer?.pictureUrl) {
      return props.customer.pictureUrl;
    }
    return "";
  };

  const handleOnSelectPicture = () => {
    if (props.onSelectPicture) {
      props.onSelectPicture();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOnSelectPicture}
      style={{ marginBottom: props.mb || 0 }}
    >
      {props.pictureUri || props.customer?.pictureUrl ? (
        <ProfileImage source={{ uri: getProfileUri() }} resizeMode="cover" />
      ) : (
        <MaterialIcons name="account-circle" size={50} color="#38A169" />
      )}
    </TouchableOpacity>
  );
}

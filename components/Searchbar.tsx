import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

type Props = {
  onPress?: () => void; // ? means this prop is optional
  placeholder: string;
};

const Searchbar = ({ onPress, placeholder }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-3">
      <Image
        source={icons.search}
        className="size-5 "
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        className="flex-1 ml-3 text-white"
        selectionColor="#ab8bff"
        value=""
        onPress={onPress}
        onChangeText={() => {}}
      />
    </View>
  );
};

export default Searchbar;

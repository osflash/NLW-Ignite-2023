import { View, Text, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

import { Feather } from "@expo/vector-icons";

import LogoImage from "../../assets/logo.svg";

export const Header = () => {
  return (
    <View className="w-full flex-row items-center justify-between">
      <LogoImage />

      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center hover:border-violet-300"
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="text-white ml-3 font-semibold text-base">
          Novo hábito
        </Text>
      </TouchableOpacity>
    </View>
  );
};

import { View, Text, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import LogoImage from "../../assets/logo.svg";

export const Header: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <LogoImage />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigate("new")}
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

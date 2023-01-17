import { View, Text, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#09090a",
      }}
    >
      <ActivityIndicator color="#7C3AED" />
    </View>
  );
};

export default Loading;

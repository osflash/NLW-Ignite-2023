import { View, Text } from "react-native";

interface ProgressBarProps {
  progress?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  return (
    <View className=" w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }}
      />
    </View>
  );
};

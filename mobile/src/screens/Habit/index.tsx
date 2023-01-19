import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { ScrollView, View, Text } from "react-native";

import type { HabitScreenRouteProp } from "../../@types/navigation";
import { BackButton } from "../../components/BackButton";
import { Checkbox } from "../../components/Checkbox";
import { ProgressBar } from "../../components/ProgressBar";

interface HabitProps {
  //
}

export const Habit: React.FC<HabitProps> = () => {
  const route = useRoute<HabitScreenRouteProp>();
  const { date } = route.params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={75} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" checked={false} />
          <Checkbox title="Caminhar" checked={true} />
        </View>
      </ScrollView>
    </View>
  );
};

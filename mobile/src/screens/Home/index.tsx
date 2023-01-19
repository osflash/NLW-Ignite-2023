import { useNavigation } from "@react-navigation/native";
import { Text, View, ScrollView } from "react-native";

import { HabitDay, daySize } from "../../components/HabitDay";

import { Header } from "../../components/Header";
import { generateDatesFromYearBeginning } from "../../utils";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export const Home: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background text-white px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: daySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate("habit", { date: date.toISOString() })}
            />
          ))}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => (
              <HabitDay key={i} placehold />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

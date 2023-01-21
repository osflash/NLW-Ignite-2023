import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { z } from "zod";

import { HabitDay, daySize } from "../../components/HabitDay";

import { Header } from "../../components/Header";
import Loading from "../../components/Loading";
import { api } from "../../services/axios";
import { generateDatesFromYearBeginning } from "../../utils";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSizes - summaryDates.length;

const summarySchema = z
  .object({
    id: z.string(),
    date: z.date(),
    amount: z.number(),
    completed: z.number(),
  })
  .array();

type SummaryInput = z.input<typeof summarySchema>;

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryInput>([]);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      api
        .get("summary")
        .then((response) => setSummary(response.data))
        .catch((err) => {
          Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos.");

          console.error(err);
        })
        .finally(() => setLoading(false));
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

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
        {summary && (
          <View className="flex-row flex-wrap">
            {summaryDates.map((date) => {
              const dayInSummary = summary.find((day) => {
                return dayjs(date).isSame(day.date); // fix
              });

              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amount={dayInSummary?.amount}
                  completed={dayInSummary?.completed}
                  onPress={() =>
                    navigate("habit", {
                      date: date.toISOString(),
                      amount: dayInSummary?.amount,
                      defaultCompleted: dayInSummary?.completed,
                    })
                  }
                />
              );
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                <HabitDay key={i} placeholder />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

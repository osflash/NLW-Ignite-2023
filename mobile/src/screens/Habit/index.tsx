import { useRoute } from "@react-navigation/native";
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { z } from "zod";

import type { HabitScreenRouteProp } from "../../@types/navigation";
import { BackButton } from "../../components/BackButton";
import { Checkbox } from "../../components/Checkbox";
import { HabitEmpty } from "../../components/HabitEmpty";
import Loading from "../../components/Loading";
import { ProgressBar } from "../../components/ProgressBar";
import { api } from "../../services/axios";

interface HabitProps {
  //
}

const habitsInfoSchema = z.object({
  possibleHabits: z
    .object({
      id: z.string(),
      title: z.string(),
      created_at: z.string(),
    })
    .array(),
  completedHabits: z.array(z.string()),
});

type habitsInfoInput = z.input<typeof habitsInfoSchema>;

export const Habit: React.FC<HabitProps> = () => {
  const route = useRoute<HabitScreenRouteProp>();
  const { date, amount = 0, defaultCompleted = 0 } = route.params;

  const [loading, setLoading] = useState(true);
  const [habitsInfo, setHabitsInfo] = useState<habitsInfoInput>();
  const [completed, setCompleted] = useState(defaultCompleted);

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  useEffect(() => {
    setLoading(true);

    api
      .get("day", { params: { date } })
      .then((response) => setHabitsInfo(response.data))
      .catch((err) => {
        console.error(err);

        Alert.alert(
          "Ops",
          "Não foi possível carregar as informações dos hábitos."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    await api.patch(`habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted =
      habitsInfo?.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    setCompleted(completedHabits.length);
  };

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  if (loading) {
    return <Loading />;
  }

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

        <ProgressBar progress={completedPercentage} />

        <View
          className={classNames("mt-6", {
            "opacity-50": isDateInPast,
          })}
        >
          {habitsInfo?.possibleHabits.length ? (
            habitsInfo.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                onPress={() => handleToggleHabit(habit.id)}
                checked={habitsInfo.completedHabits.includes(habit.id)}
                disabled={isDateInPast}
              />
            ))
          ) : (
            <HabitEmpty />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não pode editar hábitos de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

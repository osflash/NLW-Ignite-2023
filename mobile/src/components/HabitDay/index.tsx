import classNames from "classnames";
import dayjs from "dayjs";
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface HabitDayProps extends TouchableOpacityProps {
  date?: Date;
  completed?: number;
  amount?: number;
  placeholder?: boolean;
}

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get("screen").width / weekDays - (screenHorizontalPadding + 5);

export const HabitDay: React.FC<HabitDayProps> = ({
  amount = 0,
  completed = 0,
  date,
  placeholder,
  ...rest
}) => {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const parsedDate = dayjs(date);
  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = parsedDate.isSame(today);

  const cx = classNames(
    "rounded-lg border-2 m-1",
    {
      "bg-zinc-900 border-zinc-800": completedPercentage === 0,
      "bg-violet-900 border-violet-700":
        completedPercentage > 0 && completedPercentage < 20,
      "bg-violet-800 border-violet-600":
        completedPercentage >= 20 && completedPercentage < 40,
      "bg-violet-700 border-violet-500":
        completedPercentage >= 40 && completedPercentage < 60,
      "bg-violet-600 border-violet-500":
        completedPercentage >= 60 && completedPercentage < 80,
      "bg-violet-500 border-violet-400": completedPercentage >= 80,
      "border-white border-4": isCurrentDay,
    },
    { "opacity-40": placeholder }
  );

  return (
    <TouchableOpacity
      className={cx}
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
      disabled={placeholder}
      {...rest}
    />
  );
};

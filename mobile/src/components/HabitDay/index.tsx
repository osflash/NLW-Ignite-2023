import classNames from "classnames";
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface HabitDayProps extends TouchableOpacityProps {
  placehold?: boolean;
}

const weekDays = 7;
const screenHorizontalpadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get("screen").width / weekDays - (screenHorizontalpadding + 5);

export const HabitDay: React.FC<HabitDayProps> = ({ placehold, ...rest }) => {
  const cx = classNames("bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800", {
    "opacity-40": placehold,
  });

  return (
    <TouchableOpacity
      className={cx}
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
      disabled={placehold}
      {...rest}
    />
  );
};

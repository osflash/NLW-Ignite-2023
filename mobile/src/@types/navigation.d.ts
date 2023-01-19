import type {
  RouteProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";

export type RootStackParamList = {
  home: undefined;
  new: undefined;
  habit: { date: string };
};

export type HabitScreenRouteProp = RouteProp<RootStackParamList, "habit">;

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

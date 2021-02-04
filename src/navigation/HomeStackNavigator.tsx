import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { CreateReviewScreen } from "../screens/CreateReviewScreen";
/* types */
// [仮説]RootStackParamListのimportの適切な場所はここで無い気がする
// [why]一番抽象レイヤーに置くべきな気がしているから。
// [補足]でも、paramsが存在しない Navigatorは無視しても良いのか。
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: "#000" }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Shop" component={ShopScreen} />
    </Stack.Navigator>
  );
};
export const HomeStackNavigator = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="CreateReview" component={CreateReviewScreen} />
    </RootStack.Navigator>
  );
};

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
import { MainTabNavigator } from "../navigation/MainTabNavigator";
/* screens */
import { AuthScreen } from "../screens/AuthScreen";
/* context */
import { UserContext } from "../context/UserContext";

export const AppNavigator = () => {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};

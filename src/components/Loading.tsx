import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

type Props = {
  visible: boolean;
};

export const Loading = ({ visible = false }: Props) => {
  return visible ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});

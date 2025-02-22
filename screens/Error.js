import React from "react";
import { View, Text } from "react-native";

const ErrorScreen = ({ error }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Error: {error}</Text>
    </View>
  );
};

export default ErrorScreen;

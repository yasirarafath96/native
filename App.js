import React from "react";
import { Text, View } from "react-native";
import TodoList from "./Todolist";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 20 }}>Hello</Text>
      <TodoList />
    </View>
  );
}

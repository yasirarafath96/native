// TodoList.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebaseAPI from "./firebaseConfig"; // Adjust path as necessary
import { Grid, Col, Row } from "react-native-bootstrap-styles";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await firebaseAPI.get("/todos.json");
      const data = response.data;
      if (data) {
        const loadedTodos = Object.keys(data).map((key, index) => ({
          id: (index + 1).toString(),
          text: data[key].text,
        }));
        setTodos(loadedTodos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (input.trim()) {
      const newId = uuidv4(); // Generate a unique ID
      try {
        const response = await firebaseAPI.post("/todos.json", {
          id: 1, // Include the generated ID
          text: input,
        });
        const newTodo = { id: newId, text: input };
        setTodos([...todos, newTodo]);
        setInput("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await firebaseAPI.delete(`/todos/${id}.json`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const startEditTodo = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEditTodo = async () => {
    try {
      await firebaseAPI.put(`/todos/${editId}.json`, { text: editText });
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: editText } : todo
        )
      );
      setEditId(null);
      setEditText("");
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Todo List
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
        }}
        value={input}
        onChangeText={setInput}
        placeholder="Add a new todo"
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            {editId === item.id ? (
              <>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    flex: 1,
                  }}
                  value={editText}
                  onChangeText={setEditText}
                  placeholder="Edit todo"
                />
                <Button title="Save" onPress={saveEditTodo} />
              </>
            ) : (
              <>
                <Text style={{ fontSize: 18, flex: 1 }}>{item.text}</Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => startEditTodo(item.id, item.text)}
                  >
                    <Text style={{ color: "blue", marginRight: 10 }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                    <Text style={{ color: "red" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;

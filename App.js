import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Detail";
import TodoList from "./Todolist";
import firebaseAPI from "./firebase";
import LoadingScreen from "./screens/Load";
import ErrorScreen from "./screens/Error";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // Import redux-thunk

const Stack = createStackNavigator();

const [details, setDetails] = useState([]);

// Create a slice for todos
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.loading = false; // Set loading to false after data is fetched
    },
    setLoading: (state) => {
      state.loading = true; // Set loading to true when starting to fetch data
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error message in state
      state.loading = false; // Set loading to false on error
    },
  },
});

// Fetch todos from Firebase using createAsyncThunk
const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await firebaseAPI.get("/todos.json");
    const data = response.data;
    if (data) {
      return Object.keys(data).map((key) => ({
        id: key,
        text: data[key].text,
      }));
    } else {
      console.error("No data found in Firebase.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error; // Rethrow the error to be handled by Redux Toolkit
  }
});

// Configure the Redux store
const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen name="TodoList" component={TodoList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

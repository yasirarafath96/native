import axios from "axios";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebase = {
  apiKey: "AIzaSyAe9RGl8vYZuYHxTGnnIie1L5LVOJ44xh4",
  authDomain: "react-native-crud-24.firebaseapp.com",
  databaseURL: "https://react-native-crud-24-default-rtdb.firebaseio.com",
  projectId: "react-native-crud-24",
  storageBucket: "react-native-crud-24.appspot.com",
  messagingSenderId: "126375949209",
  appId: "1:126375949209:web:0ac95c14e76403440ed908",
  measurementId: "G-GHW1B94KH4",
};

initializeApp(firebase);

// Create an instance of Axios with Firebase Realtime Database URL
const firebaseAPI = axios.create({
  baseURL: "https://react-native-crud-24-default-rtdb.firebaseio.com/",
});

export default firebaseAPI;

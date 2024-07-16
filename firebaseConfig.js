import axios from "axios";
import Constants from "expo-constants";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe9RGl8vYZuYHxTGnnIie1L5LVOJ44xh4",
  authDomain: "react-native-crud-24.firebaseapp.com",
  databaseURL: "https://react-native-crud-24-default-rtdb.firebaseio.com",
  projectId: "react-native-crud-24",
  storageBucket: "react-native-crud-24.appspot.com",
  messagingSenderId: "126375949209",
  appId: "1:126375949209:web:0ac95c14e76403440ed908",
  measurementId: "G-GHW1B94KH4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseAPI = axios.create({
  baseURL: "https://react-native-crud-24-default-rtdb.firebaseio.com/",
  params: {
    auth: Constants.manifest.extra.FIREBASE_WEB_API_KEY,
  },
});

export default firebaseAPI;

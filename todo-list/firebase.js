// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY-VT7hVVoE0PXedzMZLsMgry-t8RFr_E",
  authDomain: "ssmin-todo-list.firebaseapp.com",
  projectId: "ssmin-todo-list",
  storageBucket: "ssmin-todo-list.appspot.com",
  messagingSenderId: "837738184228",
  appId: "1:837738184228:web:a4d0bc5758ee74707562b1",
  measurementId: "G-W85TF8YNEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
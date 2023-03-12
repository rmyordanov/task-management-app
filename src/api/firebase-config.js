// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2Q86hKd2cI33IKSc_AOfO9Whu_C4dbsE",
  authDomain: "employee-management-syst-8bd3e.firebaseapp.com",
  databaseURL:
    "https://employee-management-syst-8bd3e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "employee-management-syst-8bd3e",
  storageBucket: "employee-management-syst-8bd3e.appspot.com",
  messagingSenderId: "1003645330224",
  appId: "1:1003645330224:web:2f586c77ecb390b5061ef5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Realtime Database
export const rdb = getDatabase(app);

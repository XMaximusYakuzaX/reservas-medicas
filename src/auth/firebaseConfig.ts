// src/auth/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6eLnNIuYtQ0GUWOC26PiaW7exMnDpJsU",
  authDomain: "mdi-autenticaion.firebaseapp.com",
  projectId: "mdi-autenticaion",
  storageBucket: "mdi-autenticaion.firebasestorage.app",
  messagingSenderId: "428750889851",
  appId: "1:428750889851:web:720547c252478ecff013de",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

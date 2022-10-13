 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

 
const firebaseConfig = {
  apiKey: "AIzaSyBEhwYsJrjQpGPWp7j-REj9LhwzAEbdxj8",
  authDomain: "chat-3cc71.firebaseapp.com",
  projectId: "chat-3cc71",
  storageBucket: "chat-3cc71.appspot.com",
  messagingSenderId: "139389010713",
  appId: "1:139389010713:web:6e8e5cd2a79bc5b26b7b88"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAttQ1Wt5VTnrGij5uFbhZIi5JjNER1l3k",
  authDomain: "online-a261d.firebaseapp.com",
  projectId: "online-a261d",
  storageBucket: "online-a261d.appspot.com",
  messagingSenderId: "454678350093",
  appId: "1:454678350093:web:2e6e5dd100b1eeae22c844",
  measurementId: "G-C6J4C8K4JT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Authentication
export const auth = getAuth(app);
// Initialize firebase Database
export const db = getFirestore(app);
// Initialize Storage
export const storage = getStorage(app);

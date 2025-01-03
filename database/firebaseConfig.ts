// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAUfp10etdVcKR2c3CtrIviKzIgvejPqI",
  authDomain: "spotify-clone-53cda.firebaseapp.com",
  projectId: "spotify-clone-53cda",
  storageBucket: "spotify-clone-53cda.firebasestorage.app",
  messagingSenderId: "339780035206",
  appId: "1:339780035206:web:b3f5a79820e891da35a707",
  measurementId: "G-BR5Y0TM9FP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

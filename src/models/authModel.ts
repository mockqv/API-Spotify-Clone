import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../database/firebaseConfig";
import User from "../interfaces/User";
import { query } from "express";

/**
 * Function for signing in a user with email and password.
 * @param { User } user - The user object containing the email and password
 * @returns { Promise<any> } - Resolves with the sign-in data or an error
 */

export const signInWithEmailModel = async (user: User): Promise<any> => {
  try {
    const data = await signInWithEmailAndPassword(auth, user.email, user.password.toString());
    return data;
  } catch (err) {
    return err;
  }
};

/**
 * Function for signing up a new user and storing their details in Firestore.
 * @param { User } user - The user object containing the email and password
 * @returns { Promise<any> } - Resolves with the user data or an error
 */

export const signUpWithEmailModel = async (user: User): Promise<any> => {
  try {
    // Creates a new user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    
    // Gets the UID of the newly created user
    const uid = userCredential.user.uid;

    // Defines the initial user data for Firestore
    const userData = {
      nome: uid,  // Default name set as the user's UID
      email: user.email,
      photo: "",  // Default photo set as an empty string
      createdAt: serverTimestamp() // Timestamp of account creation
    };

    // Saves the data in the "users" collection with the UID as the document ID
    await setDoc(doc(db, "users", uid), userData);

    return userCredential;
  } catch (err) {
    return err;
  }
};

/**
 * Function to fetch a user document from the "users" collection based on the given document ID.
 * @param {string} id - The ID of the document to search for.
 * @returns {Promise<object | null>} - Resolves with the user document data or null if not found.
 */

export const getUserByIdModel = async (id: string): Promise<object | null> => {
  try {
    if (!id) {
      throw new Error("ID is required.");
    }

    // Verifica se a instância db está definida corretamente
    if (!db) {
      throw new Error("Firestore instance is not configured properly.");
    }

    // Referência ao documento específico pelo ID na coleção "users"
    const docRef = doc(db, "users", id);

    // Obtém o documento
    const docSnap = await getDoc(docRef);

    // Verifica se o documento existe
    if (docSnap.exists()) {
      return docSnap.data(); // Retorna os dados do documento
    }

    return null; // Retorna null se o documento não for encontrado
  } catch (error) {
    console.error("Error fetching user data:", error || error);
    return null;
  }
};
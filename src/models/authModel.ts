import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../database/firebaseConfig";
import User from "../interfaces/User";

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
    // Cria um novo usuário no Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    
    // Obtém o UID do usuário recém-criado
    const uid = userCredential.user.uid;

    // Define os dados iniciais do usuário no Firestore
    const userData = {
      nome: uid,  // Nome padrão sendo o UID do usuário
      email: user.email,
      photo: "",  // Foto padrão vazia
      createdAt: serverTimestamp() // Timestamp do momento da criação
    };

    // Salva os dados na coleção "users" com o UID como nome do documento
    await setDoc(doc(db, "users", uid), userData);

    return userCredential;
  } catch (err) {
    return err;
  }
};

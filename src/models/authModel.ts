import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../../database/firebaseConfig";
import User from "../interfaces/User";

/**
 * Function for signing in a user with email and password.
 * @param { User } user - The user object containing the email and password
 * @returns { Promise<any> } - Resolves with the sign-in data or an error
 */
export const signInWithEmailModel = async (user: User): Promise<any> => {
  try {
    // Attempts to sign in the user using the provided email and password
    const data = await signInWithEmailAndPassword(auth, user.email, user.password.toString());
    return data;  // Returns the sign-in data, such as the authenticated user
  } catch (err) {
    // If an error occurs, returns the error
    return err;
  }
};

/**
 * Function for signing up a new user with email and password.
 * @param { User } user - The user object containing the email and password
 * @returns { Promise<any> } - Resolves with the sign-up data or an error
 */
export const signUpWithEmailModel = async (user: User): Promise<any> => {
  try {
    // Attempts to create a new user with the provided email and password
    const data = createUserWithEmailAndPassword(auth, user.email, user.password);
    return data;  // Returns the sign-up data, such as the newly created user
  } catch (err) {
    // If an error occurs, returns the error
    return err;
  }
};

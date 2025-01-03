import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../../database/firebaseConfig";

interface User {
  email: string;
  password: string;
}

export const signInWithEmailModel = async (user: User): Promise<any> => {
  try{
    const data = await signInWithEmailAndPassword(auth, user.email, user.password.toString());
    return data;
  } catch (err) {
    return (err);
  };
};

export const signUpWithEmailModel = async (user: User): Promise<any> => {
  try{
    const data = createUserWithEmailAndPassword(auth, user.email, user.password)
    return data;
  } catch (err) {
    return (err);
  };
};

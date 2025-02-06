import User from "../interfaces/User";
import { signInWithEmailModel, signUpWithEmailModel } from "../models/authModel";
import { Request, Response } from "express";

/**
 * Controller for signing in a user with email and password.
 * @param { Request<any, any, User> } req - The HTTP request object containing the user credentials
 * @param { Response } res - The HTTP response object
 * @returns { Promise<any> } - Resolves with a response containing the sign-in data or an error message
 */
export async function signInWithEmailController(req: Request<any, any, User>, res: Response): Promise<any> {
  const content: User = req.body;

  try {
    // Calls the signInWithEmailModel function to authenticate the user
    const response = await signInWithEmailModel(content);

    // Sends a successful response with the authentication data
    return res.status(200).json({
      content: response
    });
  } catch (err) {
    // Sends an error response if something goes wrong during authentication
    return res.status(500).json({
      message: err
    });
  }
}

/**
 * Controller for signing up a new user with email and password.
 * @param { Request<any, any, User> } req - The HTTP request object containing the user credentials
 * @param { Response } res - The HTTP response object
 * @returns { Promise<any> } - Resolves with a response containing the sign-up data or an error message
 */
export async function signUpWithEmailController(req: Request<any, any, User>, res: Response): Promise<any> {
  const content: User = req.body;
  
  try {
    // Calls the signUpWithEmailModel function to register a new user
    const response = await signUpWithEmailModel(content);

    // Sends a successful response with the registration data
    return res.status(200).json({
      content: response
    });
  } catch (err) {
    // Sends an error response if something goes wrong during registration
    return res.status(500).json({
      message: err
    });
  }
}
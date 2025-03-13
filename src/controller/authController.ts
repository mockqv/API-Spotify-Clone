import User from "../interfaces/User";
import { getUserByIdModel, signInWithEmailModel, signUpWithEmailModel, updateUserByIdModel } from "../models/authModel";
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
export async function signUpWithEmailController(req: Request, res: Response): Promise<any> {
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

/**
 * Controller to fetch a user document from the "users" collection based on the given ID.
 * @param {Request} req - The HTTP request object containing the user ID as a route parameter.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<Response>} - Resolves with a response containing the user document data or an error message.
 */

export async function getUserByIdController(req: Request, res: Response): Promise<any> {
  const { id } = req.params;

  try {
    // Calls the model function to fetch the user document
    const userData = await getUserByIdModel(id);

    // If user data is found, return it in the response
    if (userData) {
      return res.status(200).json(userData);
    }

    // If no user is found, return a 404 response
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    // Sends an error response if something goes wrong
    return res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller for updating user data.
 * @param { Request<any, any, { id: string, name: string, photo: string }> } req - The HTTP request object containing the user data
 * @param { Response } res - The HTTP response object
 * @returns { Promise<any> } - Resolves with a response containing the update status or an error message
 */
export async function updateUserController(req: Request, res: Response): Promise<any> {
  const { id, name, photo } = req.body;

  try {
    const success = await updateUserByIdModel({ id, name, photo });

    if (!success) {
      return res.status(400).json({
        message: "Failed to update user data. Please check the provided ID.",
      });
    }

    // Sends a successful response
    return res.status(200).json({
      message: "User updated successfully!",
    });
  } catch (err) {
    // Sends an error response if something goes wrong
    return res.status(500).json({
      message: err|| "Internal server error",
    });
  }
}
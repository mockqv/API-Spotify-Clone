import { signInWithEmailModel, signUpWithEmailModel, } from "../models/authModel";
import { Request, Response } from "express";

interface User {
  email: string;
  password: string;
}

export async function signInWithEmailController(req: Request<any, any, User>, res: Response): Promise<any> {
  const content: User = req.body;

  try {
    const response = await signInWithEmailModel(content);
    return res.status(200).json({
      content: response
    })
    
  } catch (err) {
    return res.status(500).json({
      message: err
    })
  }
}

export async function signUpWithEmailController(req: Request<any, any, User>, res: Response): Promise<any> {
  const content: User = req.body;
  try {
    const response = await signUpWithEmailModel(content);
    return res.status(200).json({
      content: response
    })
  } catch (err) {
    return res.status(500).json({
      message: err
    })
  }
}

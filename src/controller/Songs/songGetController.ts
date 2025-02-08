import { Request, Response } from "express";
import songGetModel from "../../models/Songs/songGetModel";


/**
 * Controller for fetching all songs from the Firestore collection.
 * @param { Request } req - The HTTP request object.
 * @param { Response } res - The HTTP response object.
 * @returns { Promise<any> } - A promise that resolves to the HTTP response.
 */
export default async function songGetController(req: Request, res: Response): Promise<any> {
  try {
    // Fetch all songs using the model
    const songs = await songGetModel();

    // Respond with the array of songs
    return res.status(200).json({
      message: "Songs fetched successfully",
      data: songs,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
}
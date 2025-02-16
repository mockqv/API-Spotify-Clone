import { Request, Response } from "express";
import playlistGetModel from "../../models/Playlist/playlistGetModel";

/**
 * Handles the GET request to fetch all playlists.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */

export default async function playlistGetController(req: Request, res: Response): Promise<void> {
  try {
    // Call the model to fetch playlists
    const playlists = await playlistGetModel();
    res.status(200).json(playlists); // Send playlists as JSON response
  } catch (error) {
    console.error("Error in getAllPlaylists controller:", error);
    res.status(500).json({ message: "Failed to fetch playlists." });
  }
}

import { Request, Response } from "express";
import { collection, query, where, getDocs } from "firebase/firestore";
import Song from "../../interfaces/Song/Song";
import songAddModel from "../../models/Songs/songAddModel";
import { db } from "../../../database/firebaseConfig";

/**
 * Controller for adding a new song to the Firestore collection.
 * Validates that the 'author' exists in the 'artists' collection based on the 'name' field before adding the song.
 * @param { Request<{}, {}, Song> } req - The HTTP request object containing the song data in the body.
 * @param { Response } res - The HTTP response object to send back the response.
 * @returns { Promise<any> } - A promise that resolves to the HTTP response.
 */

export default async function songAddController(
  req: Request<{}, {}, Song>,
  res: Response
): Promise<any> {
  const content: Song = req.body;

  // Validate the required fields
  if (!content.image || !content.name || !content.author) {
    return res.status(400).json({
      message: "Fields 'image', 'name', and 'author' are required.",
    });
  }

  try {
    // Query the 'artists' collection to check if an author with the given name exists
    const artistsCollection = collection(db, "artists");
    const q = query(artistsCollection, where("name", "==", content.author));
    const querySnapshot = await getDocs(q);

    // If no matching author is found, return an error
    if (querySnapshot.empty) {
      return res.status(404).json({
        message: `Author '${content.author}' does not exist.`,
      });
    }

    // Call the model function to add the song
    const response = await songAddModel(content);

    // Respond with success and the new document ID
    return res.status(201).json({
      message: "Song added successfully",
      data: response,
    });
  } catch (err) {
    // Respond with error
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : err,
    });
  }
}

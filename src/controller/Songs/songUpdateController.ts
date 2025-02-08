import { Request, Response } from "express";
import songUpdateModel from "../../models/Songs/songUpdateModel";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";
import Song from "../../interfaces/Song/Song";

/**
 * Controller for updating a song in the Firestore collection.
 * @param { Request<{}, {}, Song> } req - The HTTP request object containing the song data in the body.
 * @param { Response } res - The HTTP response object to send back the response.
 * @returns { Promise<any> } - A promise that resolves to the HTTP response.
 */
export default async function songUpdateController(req: Request, res: Response): Promise<any> {
  const { id } = req.params; // Assuming the song ID is passed in the URL
  const content: Song = req.body;

  // If 'author' is provided, validate if the author exists
  if (content.author) {
    try {
      // Validate if the author exists in the "artists" collection by name
      const authorQuery = query(
        collection(db, "artists"),
        where("name", "==", content.author)
      );
      const querySnapshot = await getDocs(authorQuery);

      if (querySnapshot.empty) {
        // If no document is found, return 404 error
        return res.status(404).json({
          message: "Author does not exist.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "Error validating author",
        error: err instanceof Error ? err.message : err,
      });
    }
  }

  // Prepare the data for the update, only including fields that are not undefined
  const updateData: { [key: string]: any } = {};

  // Only include fields that are provided
  if (content.image) updateData.image = content.image;
  if (content.name) updateData.name = content.name;

  // We only add the 'author' field to updateData if the author is a valid existing author
  if (content.author) updateData.author = content.author;

  try {
    // If there's no update data (i.e., no fields to update), return an error
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No fields to update. Please provide at least one field to update.",
      });
    }

    // Call the model to update the song
    const updatedSong = await songUpdateModel(id, updateData);

    // Respond with success
    return res.status(200).json({
      message: "Song updated successfully",
      data: updatedSong,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : err,
    });
  }
}
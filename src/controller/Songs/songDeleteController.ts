import { Request, Response } from "express";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";
import songDeleteModel from "../../models/Songs/songDeleteMode";

/**
 * Controller for deleting a song from the Firestore collection.
 * @param { Request } req - The HTTP request object containing the song ID in the URL params.
 * @param { Response } res - The HTTP response object to send back the response.
 * @returns { Promise<any> } - A promise that resolves to the HTTP response.
 */
export default async function songDeleteController(req: Request, res: Response): Promise<any> {
  const { id } = req.params; // Get the song ID from URL parameters

  try {
    // Get the reference to the song document using the ID
    const songRef = doc(db, "songs", id);
    const songDoc = await getDoc(songRef);

    // If no song is found with the given ID
    if (!songDoc.exists()) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    // Get the author of the song (we assume there's an "author" field)
    const song = songDoc.data();
    const authorName = song?.author;

    // Validate if the author exists in the "artists" collection by name
    const authorQuery = query(
      collection(db, "artists"),
      where("name", "==", authorName)
    );
    const authorSnapshot = await getDocs(authorQuery);

    if (authorSnapshot.empty) {
      // If no document is found for the author, return an error
      return res.status(404).json({
        message: "Author does not exist, cannot delete song",
      });
    }

    // Call the model to delete the song
    await songDeleteModel(id);

    // Respond with success
    return res.status(200).json({
      message: "Song deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : err,
    });
  }
}

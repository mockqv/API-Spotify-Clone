import { Request, Response } from "express";
import addArtistModel from "../../models/Artist/ArtistAddModel";

interface Artist {
  image: string;
  name: string;
}

/**
 * Controller for adding a new artist to the Firestore collection.
 * @param { Request } req - The HTTP request object containing the artist data
 * @param { Response } res - The HTTP response object
 */

export default async function artistAddController(req: Request<{}, {}, Artist>, res: Response ): Promise<any> {
  const content: Artist = req.body;

  // Validate the required fields
  if (!content.image || !content.name) {
    return res.status(400).json({
      message: "Both 'image' and 'name' fields are required.",
    });
  }

  try {
    // Call the model function to add the artist
    const response = await addArtistModel(content);

    // Respond with success and the new document ID
    return res.status(201).json({
      message: "Artist added successfully",
      data: response,
    });
  } catch (err) {

    // Respond with error
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : err,
    });
  };
};

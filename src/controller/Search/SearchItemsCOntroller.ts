import { Request, Response } from "express"; // Importando os tipos Request e Response do Express
import { searchItemsModel } from "../../models/Search/SearchItemsModel";


/**
 * Controller to search for items by name in 'artists', 'playlists', and 'songs' collections.
 * @param { Request } req - The HTTP request object containing the search query
 * @param { Response } res - The HTTP response object
 * @returns { Promise<any> } - Resolves with a response containing the search results or an error message
 */

export async function searchItemsController(req: Request, res: Response): Promise<any> {
  const { name } = req.query;

  if (typeof name !== 'string') {
    return res.status(400).json({
      message: "The 'name' query parameter is required and must be a string."
    });
  }

  try {

    const results = await searchItemsModel(name);


    if (!results.artists.length && !results.playlists.length && !results.songs.length) {
      return res.status(404).json({
        message: "No items found matching the provided name."
      });
    }


    return res.status(200).json({
      message: "Items found successfully",
      data: results
    });
  } catch (err) {

    return res.status(500).json({
      message: "An error occurred while searching for items.",
      error: err|| err
    });
  }
}

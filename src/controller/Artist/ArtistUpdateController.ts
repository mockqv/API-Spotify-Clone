import { Request, Response } from "express";
import Artist from "../../interfaces/Artist/Artist";
import updateArtistModel from "../../models/Artist/ArtistUpdateModel";

export default async function artistUpdateController(req: Request<any, {}, Artist>, res: Response): Promise<any> {
  const { id } = req.params;
  const { image, name } = req.body;

  try {
    await updateArtistModel({ id, image, name });
    return res.status(200).json({
      message: "Artist and associated songs updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      error: err || "Internal server error",
    });
  }
};

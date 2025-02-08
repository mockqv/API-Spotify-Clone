import { Request, Response } from "express";
import Artist from "../../interfaces/Artist/Artist";
import deleteArtistModel from "../../models/Artist/ArtistRemoveModel";

export default async function artistDeleteController(req: Request<any, {}, Artist>, res: Response): Promise<any> {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID is required" });
    }

    try {
        await deleteArtistModel(id);
        return res.status(200).json({ message: `Artist with ID ${id} deleted successfully` });
    } catch (err) {
        return res.status(500).json({
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
};

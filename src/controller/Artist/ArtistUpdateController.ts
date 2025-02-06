import { Request, Response } from "express";
import Artist from "../../interfaces/Artist";
import updateArtistModel from "../../models/Artist/ArtistUpdateModel";



export default async function artistUpdateController(req: Request<any, {}, Artist>, res: Response): Promise<any> {
    const { id } = req.params;
    const { image, name } = req.body;

    try {
        const response = await updateArtistModel({ id, image, name });
        return res.status(200).json({
            response
        });
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    };
};
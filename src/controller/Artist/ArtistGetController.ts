import { Request, Response } from "express";
import Artist from "../../interfaces/Artist";
import getArtistsModel from "../../models/Artist/ArtistGetModel";


export default async function artistGetController(req: Request<{}, {}, Artist>, res: Response): Promise<any> {
    try {
        const response = await getArtistsModel();
        res.status(200).json({
            response
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    };
};
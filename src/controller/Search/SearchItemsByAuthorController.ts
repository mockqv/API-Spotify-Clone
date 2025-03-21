import { Request, Response } from 'express'; 
import Song from '../../interfaces/Song/Song';
import searchItemsByAuthorModel from '../../models/Search/SearchItemsByAuthorModel';


export default async function SearchItemsByAuthorController(req: Request, res: Response): Promise<void> {
    const { author } = req.body;
    console.log(author)

    if (!author) {
        res.status(400).json({ message: 'Author name is required.' });
        return;
    }

    try {
        const songs: Song[] = await searchItemsByAuthorModel(author);

        if (songs.length === 0) {
            res.status(404).json({ message: 'No songs found for this author.' });
            return;
        }

        res.status(200).json(songs);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching songs.' });
    }
}
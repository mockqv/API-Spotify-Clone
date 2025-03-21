import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../database/firebaseConfig';
import Song from '../../interfaces/Song/Song';

export default async function searchItemsByAuthorModel(authorName: string): Promise<Song[]> {
    if (!authorName) {
        console.error('Author name is undefined or null.');
        throw new Error('Author name is required');
    }

    const songsRef = collection(db, 'songs');
    const q = query(songsRef, where('author', '==', authorName)); 
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log('No matching documents.');
        return [];
    }

    const songs: Song[] = [];
    querySnapshot.forEach(doc => {
        const song = doc.data() as Song;
        song.id = doc.id;
        songs.push(song);
    });

    return songs;
}




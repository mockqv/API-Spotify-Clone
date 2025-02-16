import { collection, query, where, getDocs } from "firebase/firestore"; // Importando funções do Firebase
import Artist from "../../interfaces/Artist/Artist"; // Interface para artistas
import Song from "../../interfaces/Song/Song"; // Interface para músicas
import Playlist from "../../interfaces/Playlist/Playlist"; // Interface para playlists
import { db } from "../../../database/firebaseConfig";

/**
 * Function to search for the 'name' field in the 'artists', 'playlists', and 'songs' collections.
 * @param { string } name - The name to search for in the collections
 * @returns { Promise<any> } - Returns an object with the results from the collections or an error
 */

export const searchItemsModel = async (name: string): Promise<any> => {
  try {
    const artistsRef = collection(db, 'artists');
    const playlistsRef = collection(db, 'playlists');
    const songsRef = collection(db, 'songs');

    const artistsQuery = query(artistsRef, where('name', '>=', name), where('name', '<=', name + '\uf8ff'));
    const playlistsQuery = query(playlistsRef, where('name', '>=', name), where('name', '<=', name + '\uf8ff'));
    const songsQuery = query(songsRef, where('name', '>=', name), where('name', '<=', name + '\uf8ff'));

    const artistsSnapshot = await getDocs(artistsQuery);
    const playlistsSnapshot = await getDocs(playlistsQuery);
    const songsSnapshot = await getDocs(songsQuery);

    const artists = artistsSnapshot.docs.map(doc => doc.data() as Artist);
    const playlists = playlistsSnapshot.docs.map(doc => doc.data() as Playlist);
    const songs = songsSnapshot.docs.map(doc => doc.data() as Song);

    return { artists, playlists, songs };
  } catch (err) {
    return err;
  }
};

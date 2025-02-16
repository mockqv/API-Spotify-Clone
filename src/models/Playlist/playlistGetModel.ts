import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";
import Playlist from "../../interfaces/Playlist/Playlist";


/**
 * Fetches all playlists from the Firestore 'playlists' collection.
 * @returns { Promise<Playlist[]> } - A promise that resolves to an array of playlists.
 * @throws { Error } - Throws an error if fetching fails.
 */
export default async function playlistGetModel(): Promise<Playlist[]> {
  try {
    // Reference the 'playlists' collection
    const playlistsCollection = collection(db, "playlists");

    // Fetch all documents in the 'playlists' collection
    const querySnapshot = await getDocs(playlistsCollection);

    // Map through the query snapshot and return an array of Playlist objects
    const playlists: Playlist[] = querySnapshot.docs.map(doc => ({
      id: doc.id, // Include the document ID if needed
      ...doc.data(),
    } as Playlist));

    return playlists;
  } catch (error) {
    throw new Error("Failed to fetch playlists.");
  }
}
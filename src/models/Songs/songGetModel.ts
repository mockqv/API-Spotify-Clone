import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";
import Song from "../../interfaces/Song/Song";

/**
 * Fetches all songs from the Firestore 'songs' collection.
 * @returns { Promise<Song[]> } - A promise that resolves to an array of songs.
 * @throws { Error } - Throws an error if fetching fails.
 */
export default async function songGetModel(): Promise<Song[]> {
  try {
    // Reference the 'songs' collection
    const songsCollection = collection(db, "songs");

    // Fetch all documents in the 'songs' collection
    const querySnapshot = await getDocs(songsCollection);

    // Map through the query snapshot and return an array of Song objects
    const songs: Song[] = querySnapshot.docs.map(doc => ({
      id: doc.id, // Include the document ID if needed
      ...doc.data(),
    } as Song));

    return songs;
  } catch (error) {
    throw new Error("Failed to fetch songs.");
  }
}

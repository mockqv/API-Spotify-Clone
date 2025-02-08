import { db } from "../../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Artist from "../../interfaces/Artist/Artist";

/**
 * A function to fetch all artist documents from the Firestore 'artists' collection.
 * @returns { Promise<Artist[]> } - A promise that resolves to an array of artist objects.
 */
export default async function getArtistsModel(): Promise<Artist[]> {
  try {
    // Get the reference to the 'artists' collection
    const artistsRef = collection(db, "artists");

    // Fetch all documents in the 'artists' collection
    const snapshot = await getDocs(artistsRef);

    // Map the documents to an array of artists
    const artists: Artist[] = snapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      ...doc.data(), // Spread the document data
    } as Artist));

    return artists;
  } catch (error) {
    throw new Error("Failed to fetch artists");
  }
}

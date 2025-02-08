import { db } from "../../../database/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import ArtistUpdate from "../../interfaces/Artist/ArtistUpdate";

/**
 * A function to update an artist document in the Firestore 'artists' collection.
 * @param { ArtistUpdate } artist - The artist data to be updated (must include the ID).
 * @returns { Promise<void> } - Resolves when the update is successful.
 */

export default async function updateArtistModel(artist: ArtistUpdate): Promise<void> {
  try {
    // Get a reference to the specific document by ID
    const artistDocRef = doc(db, "artists", artist.id);

    // Update the document with the provided fields
    await updateDoc(artistDocRef, {
      ...(artist.image && { image: artist.image }),
      ...(artist.name && { name: artist.name }),
    });

  } catch (error) {
    throw new Error("Failed to update the artist");
  }
}
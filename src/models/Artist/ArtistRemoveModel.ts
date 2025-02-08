import { db } from "../../../database/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

/**
 * A function to delete an artist document from the Firestore 'artists' collection.
 * @param { string } id - The ID of the document to be deleted.
 * @returns { Promise<void> } - Resolves when the delete is successful.
 */

export default async function deleteArtistModel(id: string): Promise<void> {
  try {
    // Get a reference to the specific document by ID
    const artistDocRef = doc(db, "artists", id);

    // Delete the document
    await deleteDoc(artistDocRef);
  } catch (error) {
    throw new Error("Failed to delete the artist");
  }
}

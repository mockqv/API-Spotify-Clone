import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";

/**
 * Model for deleting a song from the Firestore collection.
 * @param { string } id - The ID of the song to delete.
 * @returns { Promise<void> } - A promise that resolves when the song is deleted.
 */

export default async function songDeleteModel(id: string): Promise<void> {
  try {
    // Get the reference to the song document
    const songRef = doc(db, "songs", id);

    // Perform the deletion in Firestore
    await deleteDoc(songRef);
  } catch (error) {
    throw new Error("Failed to delete the song");
  }
}

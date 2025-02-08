import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";
import Song from "../../interfaces/Song/Song";

/**
 * Model for updating a song in the Firestore collection.
 * @param { string } id - The ID of the song to update.
 * @param { Partial<Song> } updateData - The fields to update in the song document.
 * @returns { Promise<Song> } - A promise that resolves to the updated song document.
 */
export default async function songUpdateModel(id: string, updateData: Partial<Song>): Promise<Song> {
  try {
    // Get the reference to the song document
    const songRef = doc(db, "songs", id);

    // Perform the update in Firestore
    await updateDoc(songRef, updateData);

    // Return the updated data (you may want to return more data here)
    return {
      id,
      ...updateData, // Return the updated fields
    } as Song;
  } catch (error) {
    throw new Error("Failed to update the song");
  }
}
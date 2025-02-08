import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";
import Song from "../../interfaces/Song/Song";

/**
 * Model for adding a new song to the Firestore database.
 * @param { Song } songs - The song object containing the data to be added to the Firestore collection.
 * @returns { Promise<string> } - A promise that resolves to the ID of the newly added song document.
 * @throws { Error } - Throws an error if the song cannot be added.
 */

export default async function songAddModel(songs: Song): Promise<string> {
  try {
    // Adiciona o artista à coleção 'artists'
    const songsRef = await addDoc(collection(db, "songs"), songs);

    return songsRef.id;
  } catch (error) {
    console.error("Error adding song:", error);
    throw new Error("Failed to add the song");
  };
};
import { collection, addDoc } from "firebase/firestore"; // Importe os métodos necessários
import { db } from "../../../database/firebaseConfig"; // Supondo que o db já esteja configurado com getFirestore

interface Artist {
  image: string;
  name: string;
}

/**
 * A function used to insert an Artist document into the Firestore 'artists' collection
 * @param { Artist } artist - The artist data to be added
 * @returns { Promise<string> } - The ID of the newly created document
 */

export default async function addArtistModel(artist: Artist): Promise<string> {
  try {
    // Adiciona o artista à coleção 'artists'
    const artistRef = await addDoc(collection(db, "artists"), artist);
    return artistRef.id;
  } catch (error) {
    console.error("Error adding artist:", error);
    throw new Error("Failed to add the artist");
  };
};
import { db } from "../../../database/firebaseConfig";
import { doc, updateDoc, getDoc, collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import ArtistUpdate from "../../interfaces/Artist/ArtistUpdate";

/**
 * A function to update an artist document in the Firestore 'artists' collection.
 * @param { ArtistUpdate } artist - The artist data to be updated (must include the ID).
 * @returns { Promise<void> } - Resolves when the update is successful.
 */
export default async function updateArtistModel(artist: ArtistUpdate): Promise<void> {
  try {
    // Get a reference to the specific artist document by ID
    const artistDocRef = doc(db, "artists", artist.id);

    // Get the artist document to retrieve the current name
    const artistDocSnapshot = await getDoc(artistDocRef);
    if (!artistDocSnapshot.exists()) {
      throw new Error("Artist not found");
    }

    const oldName = artistDocSnapshot.data().name;

    // Update the artist's name and image (if provided)
    await updateDoc(artistDocRef, {
      ...(artist.image && { image: artist.image }),
      ...(artist.name && { name: artist.name }), // Update the artist's name
    });

    // If the artist's name has changed, update all songs with the old name as author
    if (oldName !== artist.name) {
      const songsRef = collection(db, "songs");
      const songQuery = query(songsRef, where("author", "==", oldName));

      // Get all songs where the author is the old artist's name
      const songSnapshot = await getDocs(songQuery);

      if (!songSnapshot.empty) {
        const batch = writeBatch(db);
        songSnapshot.forEach((docSnapshot) => {
          const songRef = doc(db, "songs", docSnapshot.id);
          batch.update(songRef, { author: artist.name }); // Update the author name
        });

        // Commit the batch update
        await batch.commit();
      }
    }
  } catch (error) {
    throw new Error("Failed to update the artist: " + (error instanceof Error ? error.message : error));
  }
}

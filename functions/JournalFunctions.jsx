import { collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../components/firebase"; // Use `db` for Firestore instance

// Function to add a journal entry
export const addJournalEntry = async (entryText) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const journalRef = collection(db, "users", userId, "journalEntries");
    await addDoc(journalRef, {
      entryText,
      date: serverTimestamp(),
    });

    console.log("Journal entry added successfully!");
  } catch (error) {
    console.error("Error adding journal entry:", error.message);
  }
};


export const getJournalEntries = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const journalRef = collection(db, "users", userId, "journalEntries");
    const q = query(journalRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching journal entries:", error.message);
    return [];
  }
};

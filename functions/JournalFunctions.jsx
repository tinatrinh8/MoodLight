import { collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../components/firebase"; // Use `db` for Firestore instance

/**
 * Function to add a journal entry
 * @param {string} entryText - The content of the journal entry
 * @param {string} entryTitle - The title of the journal entry
 */
export const addJournalEntry = async (entryText, entryTitle) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    if (!entryTitle) throw new Error("Entry title is required."); // Validation for title

    const journalRef = collection(db, "users", userId, "journalEntries");
    await addDoc(journalRef, {
      entryText,
      entryTitle,
      date: serverTimestamp(),
    });

    console.log("Journal entry added successfully!");
  } catch (error) {
    console.error("Error adding journal entry:", error.message);
  }
};

/**
 * Function to fetch journal entries
 * @returns {Array} Array of journal entry objects
 */
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

/**
 * Function to save a journal entry using prompt responses
 * @param {Array} promptResponses - Array of responses to prompts
 * @param {string} entryTitle - The title of the journal entry
 */
export const handleSavePromptEntry = async (promptResponses, entryTitle) => {
  const nonEmptyResponses = promptResponses.filter((response) => response.trim());
  if (nonEmptyResponses.length >= 3) {
    try {
      const entryText = nonEmptyResponses.join("\n\n"); // Combine responses into a single text
      await addJournalEntry(entryText, entryTitle); // Pass the entry text and title
      console.log("Prompt entry saved successfully!");
    } catch (error) {
      console.error("Error saving prompt entry:", error.message);
      throw error;
    }
  } else {
    throw new Error("Please fill out at least 3 prompts.");
  }
};

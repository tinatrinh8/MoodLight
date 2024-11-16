import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../components/firebase"; // Use `db` for Firestore instance

/**
 * Function to add a journal entry with a journalDate field
 * @param {string} entryText - The content of the journal entry
 * @param {string} entryTitle - The title of the journal entry
 * @param {string} journalDate - The date of the journal entry as a plain string (e.g., 'YYYY-MM-DD')
 */
export const addJournalEntry = async (entryText, entryTitle, journalDate) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    console.log("Adding journal entry with the following data:");
    console.log("User ID:", userId);
    console.log("Entry Text:", entryText);
    console.log("Entry Title:", entryTitle);
    console.log("Journal Date:", journalDate);

    const journalRef = collection(db, "users", userId, "journalEntries");
    await addDoc(journalRef, {
      entryText,
      entryTitle,
      journalDate, // Save journalDate as a plain string
    });

    console.log("Journal entry added successfully!");
  } catch (error) {
    console.error("Error adding journal entry:", error.message);
    throw error;
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
    const q = query(journalRef, orderBy("journalDate", "desc")); // Sorting by journalDate
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Include all fields as is
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
 * @param {string} journalDate - The date of the journal entry as a plain string (e.g., 'YYYY-MM-DD')
 */
export const handleSavePromptEntry = async (promptResponses, entryTitle, journalDate) => {
  const nonEmptyResponses = promptResponses.filter((response) => response.trim());
  if (nonEmptyResponses.length >= 3) {
    try {
      const entryText = nonEmptyResponses.join("\n\n"); // Combine responses into a single text
      await addJournalEntry(entryText, entryTitle, journalDate); // Save journalDate as a plain string
      console.log("Prompt entry saved successfully!");
    } catch (error) {
      console.error("Error saving prompt entry:", error.message);
      throw error;
    }
  } else {
    throw new Error("Please fill out at least 3 prompts.");
  }
};

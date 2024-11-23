import { collection, addDoc, deleteDoc, doc, query, orderBy, updateDoc, getDocs, where } from "firebase/firestore";
import { auth, db } from "../components/firebase"; // Use `db` for Firestore instance
/**
 * Function to add a journal entry with support for different types (free or prompts)
 * @param {string} entryText - The content of the journal entry (string for free, array for prompts)
 * @param {string} entryTitle - The title of the journal entry
 * @param {string} journalDate - The date of the journal entry as a plain string (e.g., 'YYYY-MM-DD')
 * @param {string} type - The type of the journal entry ("free" or "prompts")
 */
export const addJournalEntry = async (entryText, entryTitle, journalDate, type) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    if (!type || !["free", "prompts"].includes(type)) {
      throw new Error(`Invalid entry type: ${type}`);
    }

    if (!entryText) {
      throw new Error("Entry text is required");
    }

    if (!entryTitle) {
      throw new Error("Entry title is required");
    }

    const journalRef = collection(db, "users", userId, "journalEntries");
    const entry = {
      entryText,
      entryTitle,
      journalDate,
      type, // Ensure type is saved correctly
    }
    await addDoc(journalRef, entry);

    console.log("Journal entry added successfully!");

    return entry
  } catch (error) {
    console.error("Error adding journal entry:", error.message);
    throw error;
  }
};

export const updateEntryInFirestore = async (updatedEntry, setJournalEntries) => {
  try {
    // Update the entry in Firestore
    await updateJournalEntry(updatedEntry.id, updatedEntry);

    // Update the local state if `setJournalEntries` is provided
    if (setJournalEntries) {
      setJournalEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === updatedEntry.id ? updatedEntry : entry
        )
      );
    }

    console.log("Journal entry updated successfully in Firestore.");
  } catch (error) {
    console.error("Error updating entry in Firestore:", error.message);
    alert("An error occurred while updating the journal entry.");
  }
};


export const updateJournalEntry = async (id, updatedEntry) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userId = user.uid; // Use the authenticated user's UID
  const entryRef = doc(db, "users", userId, "journalEntries", id);

  await updateDoc(entryRef, updatedEntry);
  console.log("Journal entry updated successfully in Firestore.");
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
 * Function to fetch journal entries by a specific date
 * @param {string} journalDate - The date of the journal entry to search for
 * @returns {Array} Array of journal entries for the specific date
 */
export const getJournalEntriesByDate = async (journalDate) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const journalRef = collection(db, "users", userId, "journalEntries");
    const q = query(journalRef, where("journalDate", "==", journalDate));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error fetching journal entries for date ${journalDate}:`, error.message);
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

/**
 * Function to delete a journal entry
 * @param {string} entryId - The ID of the journal entry to delete
 */
export const deleteJournalEntry = async (entryId) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    // Reference to the specific journal entry document
    const entryRef = doc(db, "users", userId, "journalEntries", entryId);

    // Delete the document
    await deleteDoc(entryRef);

    console.log("Journal entry deleted successfully!");
  } catch (error) {
    console.error("Error deleting journal entry:", error.message);
    throw error; // Rethrow error for further handling if needed
  }
};


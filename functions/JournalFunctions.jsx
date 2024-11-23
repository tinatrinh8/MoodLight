import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { getEmotion } from "../utils/HuggingFaceAPI"; // Utility for Hugging Face API integration

/**
 * Function to add a journal entry with support for different types (free or prompts)
 * and saving top emotions.
 * @param {string} entryText - The content of the journal entry (string for free, array for prompts)
 * @param {string} entryTitle - The title of the journal entry
 * @param {string} journalDate - The date of the journal entry as a plain string (e.g., 'YYYY-MM-DD')
 * @param {string} type - The type of the journal entry ("free" or "prompts")
 * @param {Array<string>} topEmotions - The top three detected emotions (default: empty array)
 */
export const addJournalEntry = async (
  entryText,
  entryTitle,
  journalDate,
  type,
  topEmotions = []
) => {
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
      type,
      topEmotions, // Include the top emotions in the saved document
      createdAt: new Date().toISOString(), // Optionally add a timestamp
    };

    const docRef = await addDoc(journalRef, entry);
    console.log("Journal entry added successfully!");

    return { id: docRef.id, ...entry }; // Return the entry with the generated ID
  } catch (error) {
    console.error("Error adding journal entry:", error.message);
    throw error;
  }
};

/**
 * Function to update an existing journal entry in Firestore.
 * This supports updating top emotions or other fields.
 * @param {string} id - The Firestore document ID of the journal entry
 * @param {Object} updatedEntry - The updated entry data
 */
export const updateJournalEntry = async (id, updatedEntry) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const entryRef = doc(db, "users", userId, "journalEntries", id);
    await updateDoc(entryRef, updatedEntry); // Updated entry can include `topEmotions`
    console.log("Journal entry updated successfully in Firestore.");
  } catch (error) {
    console.error("Error updating journal entry:", error.message);
    throw error;
  }
};

/**
 * Function to fetch all journal entries for the authenticated user.
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
 * Function to fetch journal entries for a specific date.
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
    console.error(
      `Error fetching journal entries for date ${journalDate}:`,
      error.message
    );
    return [];
  }
};

/**
 * Function to save a journal entry using prompts and detect emotions.
 * @param {Array<string>} promptResponses - Array of responses to prompts
 * @param {string} entryTitle - The title of the journal entry
 * @param {string} journalDate - The date of the journal entry as a plain string (e.g., 'YYYY-MM-DD')
 */
export const savePromptEntry = async (promptResponses, entryTitle, journalDate) => {
  try {
    if (!entryTitle.trim()) {
      throw new Error("Please provide a title for your journal entry.");
    }

    const combinedResponses = promptResponses.filter((r) => r.trim()).join(" ");

    // Detect emotions for the combined responses
    const detectedEmotions = await getEmotion(combinedResponses);
    const topEmotions = detectedEmotions
      .sort((a, b) => b.score - a.score) // Sort by score
      .slice(0, 3) // Get top 3 emotions
      .map((emotion) => emotion.label.toLowerCase()); // Extract emotion labels

    const addedEntry = await addJournalEntry(
      combinedResponses,
      entryTitle,
      journalDate,
      "prompts",
      topEmotions // Save top emotions
    );

    console.log("Prompt-based entry saved with emotions:", topEmotions);
    return addedEntry;
  } catch (error) {
    console.error("Error saving prompt entry:", error.message);
    throw error;
  }
};

/**
 * Function to delete a journal entry.
 * @param {string} entryId - The ID of the journal entry to delete
 */
export const deleteJournalEntry = async (entryId) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const entryRef = doc(db, "users", userId, "journalEntries", entryId);
    await deleteDoc(entryRef);

    console.log("Journal entry deleted successfully!");
  } catch (error) {
    console.error("Error deleting journal entry:", error.message);
    throw error;
  }
};

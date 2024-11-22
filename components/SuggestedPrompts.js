import React from "react";
import prompts from "../assets/prompts"; // Import default prompts
import Config from "react-native-config"; // For managing environment variables
import { db } from "../components/firebase"; // Import Firestore (db) from Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import required Firestore functions

const apiKey = Config.OPENAI_API_KEY;

/**
 * Fetch journal entries from Firestore.s
 * @returns {Promise<Array>} - List of journal entries
 */

export const getJournalEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "journalEntries"));
    const journalEntries = [];

    querySnapshot.forEach((doc) => {
      // Assume each document has 'entryText' field
      journalEntries.push({ id: doc.id, ...doc.data() });
    });

    return journalEntries;
  } catch (error) {
    console.error("Error fetching journal entries from Firestore:", error);
    return [];
  }
};

export const getSuggestedPrompts = async (pastEntries) => {
  if (!pastEntries || pastEntries.length === 0) {
    const shuffledPrompts = prompts.sort(() => 0.5 - Math.random());
    return shuffledPrompts.slice(0, 5);
  }

  try {
    const recentEntries = pastEntries.slice(-3);
    const contextText = recentEntries
      .map((entry) => entry.entryText)
      .join("\n");

    // Ensure the API key is correctly included
    console.log("Using API Key:", apiKey); // Log to confirm API key is not undefined

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Generate 5 unique reflective and personal journaling prompts for the user based on their following past journal entries: ${contextText}`,
        max_tokens: 150,
        n: 1,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.length > 0) {
      const aiPrompts = data.choices[0].text
        .split("\n")
        .map((prompt) => prompt.trim())
        .filter((prompt) => prompt);
      return aiPrompts.slice(0, 5);
    } else {
      console.error("AI prompt generation failed:", data);
    }
  } catch (error) {
    console.error("Error fetching AI-generated prompts:", error);
  }

  return prompts.slice(0, 5);
};

import React from "react";
import prompts from "../assets/prompts"; // Import default prompts
import { db } from "../components/firebase"; // Import Firestore (db) from Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import required Firestore functions
import { OPENAI_API_KEY } from "@env"; // Import the OpenAI API key

console.log("Loaded API Key:", OPENAI_API_KEY); // Log the API key to ensure it is loaded

// Default first-time prompts
const firstTimePrompts = [
  "What inspired you to start journaling today?",
  "Describe a moment that made you smile recently.",
  "What is one thing you are grateful for today?",
  "What is a goal or aspiration you’d like to achieve?",
  "How are you feeling about starting this journaling journey?",
];

// Fetch journal entries from Firestore
export const getJournalEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "journalEntries"));
    const journalEntries = [];

    querySnapshot.forEach((doc) => {
      journalEntries.push({ id: doc.id, ...doc.data() });
    });

    return journalEntries;
  } catch (error) {
    console.error("Error fetching journal entries from Firestore:", error);
    return [];
  }
};

// Suggest prompts for journaling
export const getSuggestedPrompts = async (pastEntries) => {
  if (!OPENAI_API_KEY) {
    console.error("API key is missing or not loaded!");
    return prompts.slice(0, 5); // Fallback to default prompts
  }

  // Check if it's the user's first time journaling
  if (!pastEntries || pastEntries.length === 0) {
    console.log(
      "First-time user detected. Returning default first-time prompts."
    );
    return firstTimePrompts;
  }

  try {
    // Filter past entries to include only recent ones (e.g., entries from today or earlier)
    const today = new Date();
    const filteredEntries = pastEntries.filter((entry) => {
      const entryDate = new Date(entry.journalDate);
      return entryDate <= today; // Only include entries from today or earlier
    });

    const recentEntries = filteredEntries.slice(-3);
    const contextText = recentEntries
      .map((entry) => entry.entryText)
      .join("\n");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. Generate reflective journal prompts.",
          },
          {
            role: "user",
            content: `Based on these recent journals: ${contextText}, generate exactly 5 uniquely reflective prompts. 
            Do not include any introductions, explanations, or additional text—just the 5 prompts in list form. Ensure 
            that these prompts are fresh, non-repetitive, and tailored to expand on past reflections or emotions. 
            Avoid using language or concepts repeated in the recent entries.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.length > 0) {
      const aiPrompts = data.choices[0].message.content
        .split("\n")
        .map((prompt) => prompt.trim())
        .filter((prompt) => prompt);

      // Remove duplicates and repetitive prompts
      const usedPrompts = new Set(
        recentEntries.map((entry) => entry.entryText)
      );
      const uniquePrompts = aiPrompts.filter(
        (prompt) => !usedPrompts.has(prompt)
      );

      return uniquePrompts.length >= 5
        ? uniquePrompts.slice(0, 5)
        : uniquePrompts.concat(
            prompts
              .filter((p) => !uniquePrompts.includes(p))
              .slice(0, 5 - uniquePrompts.length)
          );
    } else {
      console.error("OpenAI API did not return valid choices:", data);
    }
  } catch (error) {
    console.error("Error fetching AI-generated prompts:", error);
  }

  return prompts.slice(0, 5); // Fallback to default prompts
};

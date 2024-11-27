import React from "react";
import prompts from "../assets/prompts"; // Import default prompts
import { db } from "../components/firebase"; // Import Firestore (db) from Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import required Firestore functions
import { OPENAI_API_KEY } from "@env"; // Import the OpenAI API key

console.log("Loaded API Key:", OPENAI_API_KEY); // Log the API key to ensure it is loaded

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

export const getSuggestedPrompts = async (pastEntries) => {
  if (!OPENAI_API_KEY) {
    console.error("API key is missing or not loaded!");
    return prompts.slice(0, 5); // Fallback to default prompts
  }

  if (!pastEntries || pastEntries.length === 0) {
    const shuffledPrompts = prompts.sort(() => 0.5 - Math.random());
    return shuffledPrompts.slice(0, 5);
  }

  try {
    const recentEntries = pastEntries.slice(-3);
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
            content: `Based on these recent journal entries: ${contextText}, generate exactly 5 full reflective and personal prompts. 
            Do not include any introductions, explanations, or additional text—just the 5 prompts in list form. Full Complete Sentences
            (keep it at max_tokens: 150)`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.length > 0) {
      return data.choices[0].message.content
        .split("\n")
        .map((prompt) => prompt.trim())
        .filter((prompt) => prompt);
    } else {
      console.error("OpenAI API did not return valid choices:", data);
    }
  } catch (error) {
    console.error("Error fetching AI-generated prompts:", error);
  }

  return prompts.slice(0, 5); // Fallback to default prompts
};

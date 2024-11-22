import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import defaultPrompts from "../assets/prompts";

const SuggestedPrompts = ({ recentEntries }) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      if (recentEntries.length === 0) {
        // No past entries: use default prompts
        setPrompts(defaultPrompts.sort(() => 0.5 - Math.random()).slice(0, 5)); // Shuffle and take 5
        setLoading(false);
        return;
      }

      try {
        // Fetch AI-suggested prompts
        const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003",
            prompt: `
              Based on these journal entries, suggest five journaling prompts:
              ${recentEntries
                .map((entry, i) => `Entry ${i + 1}: ${entry}`)
                .join("\n")}
            `,
            max_tokens: 150,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
            },
          }
        );

        const aiPrompts = response.data.choices[0]?.text
          .trim()
          .split("\n")
          .filter((prompt) => prompt);

        setPrompts(aiPrompts.length > 0 ? aiPrompts : defaultPrompts);
      } catch (error) {
        console.error("Error fetching AI prompts:", error.message);
        setPrompts(defaultPrompts); // Fallback to default prompts
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [recentEntries]);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {prompts.map((prompt, index) => (
        <View key={index} style={styles.promptBox}>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  promptBox: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  promptText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SuggestedPrompts;

import axios from "axios";
import { HUGGING_FACE_API_KEY } from "@env";

// Helper Function for Retrying Requests
const retryRequest = async (fn, retries = 3, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      const randomizedDelay = delay * Math.pow(2, i) + Math.random() * 1000;
      console.warn(`Retrying request (${i + 1}/${retries})...`);
      await new Promise((resolve) => setTimeout(resolve, randomizedDelay));
    }
  }
};

export const getEmotion = async (text) => {
  if (!text || typeof text !== "string") {
    console.error("Invalid input for emotion analysis:", text);
    throw new Error(
      "Invalid input: Emotion analysis requires a non-empty string."
    );
  }

  try {
    console.log("Sending text to Hugging Face API:", text);
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/borisn70/bert-43-multilabel-emotion-detection",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "x-wait-for-model": "true",
        },
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Unexpected API response format. Expected an array.");
    }

    console.log("Emotion API Response:", response.data);
    return response.data[0];
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(
        `API Error: ${error.response.status} - ${
          error.response.data.error || error.response.data
        }`
      );
    } else if (error.request) {
      console.error("No response from API:", error.request);
      throw new Error("No response received from API.");
    } else {
      console.error("Error fetching emotion data:", error.message);
      throw new Error("Unexpected error occurred.");
    }
  }
};

// Reflective Summary Generation with OpenAI (Axios Implementation)
export const getReflectiveSummary = async (text) => {
  const prompt = `
  Based on the following journal entry, write a personalized and reflective summary as if you are directly addressing the writer. 
  The summary should acknowledge the writer's feelings, summarize only no feedback yet.
  Use short paragraphs to make the summary enjoyable to read.

  Journal Entry: "${text}"

  Personalized Summary:
  `;

  try {
    const response = await retryRequest(() =>
      axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 160, // Limit token usage
          temperature: 0.8, // Creativity level
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response) {
      console.error(
        `OpenAI API Error: ${error.response.status} - ${error.response.data.error.message}`
      );
      return "OpenAI API encountered an error. Please try again later.";
    }
    if (error.request) {
      console.error("No response received from OpenAI API:", error.request);
      return "No response from OpenAI API. Please check your network connection.";
    }
    console.error("Unexpected error:", error.message);
    return "An unexpected error occurred. Please try again.";
  }
};

// Feedback Generation with OpenAI (Axios Implementation)
export const getFeedback = async (text, topEmotions) => {
  if (!text || typeof text !== "string") {
    console.error("Invalid input for feedback generation:", text);
    throw new Error("Feedback generation requires a non-empty string.");
  }

  if (!topEmotions || !Array.isArray(topEmotions) || topEmotions.length === 0) {
    console.warn("No top emotions provided. Defaulting to 'neutral'.");
    topEmotions = ["neutral"]; // Fallback emotion
  }

  const prompt = `
  Based on the following journal entry, provide personalized feedback/suggestions that is encouraging and constructive.
  - Help the writer navigate their emotions, if they are feeling negative acknowledge it, focus on actionable advice.
    Use short paragraphs to make the suggestions enjoyable to read (keep it at max_tokens: 300).

  Journal Entry: "${text}"

  Feedback:
  `;

  try {
    const response = await retryRequest(() =>
      axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 300, // Limit token usage
          temperature: 0.8, // Creativity level
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response) {
      console.error(
        `OpenAI API Error: ${error.response.status} - ${error.response.data.error.message}`
      );
      return "OpenAI API encountered an error. Please try again later.";
    }
    if (error.request) {
      console.error("No response received from OpenAI API:", error.request);
      return "No response from OpenAI API. Please check your network connection.";
    }
    console.error("Unexpected error:", error.message);
    return "An unexpected error occurred. Please try again.";
  }
};

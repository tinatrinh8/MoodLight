import axios from "axios";
import { HUGGING_FACE_API_KEY } from "@env";

// Primary: The model preferred by the user/original implementation
const MODEL_PRIMARY = "borisn70/bert-43-multilabel-emotion-detection";
// Fallback: A known, reliable public model for emotion detection
const MODEL_FALLBACK = "j-hartmann/emotion-english-distilroberta-base";

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

const runInference = async (text, modelId) => {
  const endpoint = `https://api-inference.huggingface.co/models/${modelId}`;

  const response = await axios.post(
    endpoint,
    { inputs: text },
    {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        "x-wait-for-model": "true",
      },
    }
  );
  // Handle different response structures
  if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
    return response.data[0];
  } else if (Array.isArray(response.data)) {
    return response.data;
  }
  // If response is a single object (e.g., an error or unexpected format)
  throw new Error(`Unexpected model response structure from ${modelId}.`);
};

export const getEmotion = async (text) => {
  if (!text || typeof text !== "string") {
    console.error("Invalid input for emotion analysis:", text);
    throw new Error(
      "Invalid input: Emotion analysis requires a non-empty string."
    );
  }

  try {
    // 1. Try the Primary Model (User's preferred choice)
    console.log(`Sending text to Hugging Face API (Primary: ${MODEL_PRIMARY})`);
    try {
      return await runInference(text, MODEL_PRIMARY);
    } catch (primaryError) {
      // 2. If Primary Model fails, log and try the Fallback
      console.warn(
        `Primary model (${MODEL_PRIMARY}) failed. Error: ${primaryError.message}. Attempting Fallback...`
      );

      // 3. Try the Fallback Model
      console.log(
        `Sending text to Hugging Face API (Fallback: ${MODEL_FALLBACK})`
      );
      return await runInference(text, MODEL_FALLBACK);
    }
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(
        `API Error: ${error.response.status} - ${
          error.response.data.error || JSON.stringify(error.response.data)
        }`
      );
    } else if (error.request) {
      console.error("No response from API:", error.request);
      throw new Error("No response received from API.");
    } else {
      console.error("Error fetching emotion data:", error.message);
      throw new Error(`Unexpected error occurred: ${error.message}`);
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

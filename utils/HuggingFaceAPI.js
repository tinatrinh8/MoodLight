import axios from "axios";
import { HUGGING_FACE_API_KEY } from "@env";

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

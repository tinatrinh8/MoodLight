// JournalAPI.js

// Function to fetch emotion analysis for a journal entry
export const fetchEmotionAnalysis = async (journalText) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/borisn70/bert-43-multilabel-emotion-detection",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`, // Replace with your Hugging Face token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: journalText }), // Sending the journal text
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch emotions from Hugging Face API");
    }

    const data = await response.json();

    // Sort emotions by score in descending order and return top 3
    return data
      .sort((a, b) => b.score - a.score) // Sort highest to lowest
      .slice(0, 3); // Get top 3 emotions
  } catch (error) {
    console.error("Error fetching emotion analysis:", error.message);
    throw error; // Propagate the error to the calling component
  }
};

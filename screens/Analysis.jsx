import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/AnalysisStyles";
import Header from "../components/Header";
import { getEmotion } from "../utils/HuggingFaceAPI";
import { updateJournalEntry } from "../functions/JournalFunctions";
import { emotionData } from "../components/emotionData"; // Emotion icons and metadata

// EmotionCard Component
function EmotionCard({ rank, emotion, icon }) {
  return (
    <View style={[styles.emotionCard, styles[`emotionCardRank${rank}`]]}>
      <Text style={styles.rankText}>{rank}</Text>
      <Image
        accessibilityLabel={`${emotion} icon`}
        resizeMode="contain"
        source={icon}
        style={styles.emotionIcon}
      />
      <Text style={styles.emotionName}>{emotion}</Text>
    </View>
  );
}

// EmotionsDetected Component
function EmotionsDetected({ emotions }) {
  const [emotionsMeta, setEmotionMeta] = useState([]);

  useEffect(() => {
    setEmotionMeta([
      {
        rank: 2,
        emotion: emotions[1],
        icon: emotionData[emotions[1]],
      },
      {
        rank: 1,
        emotion: emotions[0],
        icon: emotionData[emotions[0]],
      },
      {
        rank: 3,
        emotion: emotions[2],
        icon: emotionData[emotions[2]],
      },
    ]);
  }, [emotions]);

  return (
    <View style={styles.emotionsSection}>
      <Text style={styles.title}>Top Emotions Detected</Text>
      <View style={styles.emotionsContainer}>
        {emotionsMeta.map((emotion, index) => (
          <EmotionCard key={index} {...emotion} />
        ))}
      </View>
    </View>
  );
}

// SummaryFeedback Component
function SummaryFeedback({ entry }) {
  const navigation = useNavigation();

  const handleViewJournal = () => {
    navigation.navigate("MainTabs", {
      screen: "Home",
      params: { viewJournalEntry: entry },
    });
  };

  return (
    <View>
      <Text style={styles.sectionTitleCentered}>Summary</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryContent}>
          {"This is your emotion summary. Use it to reflect and grow."}
        </Text>
      </View>

      <Text style={styles.sectionTitleCentered}>Feedback</Text>
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsContent}>
          {"Consider journaling regularly to track emotional trends."}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.viewPromptButton}
        onPress={handleViewJournal}
        accessibilityRole="button"
      >
        <Text style={styles.viewPromptText}>View Journal</Text>
      </TouchableOpacity>
    </View>
  );
}

// Main Analysis Component
export default function Analysis() {
  const route = useRoute();
  const navigation = useNavigation();

  // Default journal entry if no parameters are provided
  const ENTRY_DEFAULTS = {
    entryId: null,
    entryTitle: "Untitled Entry",
    entryText: "",
    type: "general",
    journalDate: "MM/YYYY",
  };

  const entry = route.params || ENTRY_DEFAULTS;
  const { entryId, entryTitle, entryText, journalDate } = entry;

  const [topEmotions, setTopEmotions] = useState([]);
  const [loadingEmotions, setLoadingEmotions] = useState(true);

  const closeModal = () => {
    navigation.navigate("MainTabs", { screen: "Home" });
  };

  // Filter and sort emotions
  const filterEmotions = (emotions) => {
    const sortedEmotions = emotions.sort((a, b) => b.score - a.score);
    const uniqueEmotions = [];
    const seen = new Set();

    for (const emotion of sortedEmotions) {
      if (!seen.has(emotion.label.toLowerCase())) {
        uniqueEmotions.push(emotion.label.toLowerCase());
        seen.add(emotion.label.toLowerCase());
      }
      if (uniqueEmotions.length === 3) break;
    }
    return uniqueEmotions;
  };

  // Parse and save top emotions
  const parseTopEmotions = async (emotions) => {
    const filteredEmotions = filterEmotions(emotions);
    setTopEmotions(filteredEmotions);

    if (entryId) {
      try {
        await updateJournalEntry(entryId, { topEmotions: filteredEmotions });
        console.log("Top emotions saved successfully.");
      } catch (error) {
        console.error("Error saving top emotions:", error);
      }
    } else {
      console.warn("No entryId provided, unable to save top emotions.");
    }
  };

useEffect(() => {
  const fetchEmotions = async () => {
    setLoadingEmotions(true);

    try {
      let textForAnalysis = "";

      if (entry.topEmotions && entry.topEmotions.length > 0) {
        // Use stored emotions if available
        setTopEmotions(entry.topEmotions);
        return;
      }

      if (entry.type === "prompts" && entry.promptsData) {
        // Combine all prompt responses into a single string
        textForAnalysis = entry.promptsData
          .map((item) => item.response)
          .join(". "); // Join all responses with a period and space
      } else if (entryText) {
        // Use free-writing text as-is
        textForAnalysis = entryText;
      }

      if (!textForAnalysis || typeof textForAnalysis !== "string") {
        throw new Error("Invalid input: Emotion analysis requires a non-empty string.");
      }

      console.log("Text for emotion analysis:", textForAnalysis);

      const detectedEmotions = await getEmotion(textForAnalysis);

      if (!detectedEmotions || !Array.isArray(detectedEmotions)) {
        throw new Error("Invalid response from emotion analysis API.");
      }

      await parseTopEmotions(detectedEmotions);
    } catch (error) {
      console.error("Error fetching emotions:", error.message || error);
    } finally {
      setLoadingEmotions(false);
    }
  };

  fetchEmotions();
}, [entry, entryId, entryText]);




  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        <Header />

        <TouchableOpacity onPress={closeModal} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>×</Text>
        </TouchableOpacity>

        <View style={styles.analysisHeader}>
          <Text style={styles.resultsText}>Analysis Results</Text>
          <Image source={require("../assets/sofa.png")} style={styles.sofa} />
          <View style={styles.journalEntryContainer}>
            <Text style={styles.journalEntryDate}>Date: {journalDate}</Text>
            <Text style={styles.journalEntryTitle}>{entryTitle}</Text>
          </View>
        </View>

        {loadingEmotions ? (
          <Text>Loading emotions...</Text>
        ) : (
          <EmotionsDetected emotions={topEmotions} />
        )}

        <SummaryFeedback entry={entry} />
      </View>
    </ScrollView>
  );
}

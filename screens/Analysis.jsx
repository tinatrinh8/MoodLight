import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/AnalysisStyles";
import Header from "../components/Header";
import {
  getEmotion,
  getReflectiveSummary,
  getFeedback,
} from "../utils/HuggingFaceAPI";
import { updateJournalEntry } from "../functions/JournalFunctions";
import { emotionData } from "../components/emotionData";
import { getEmotionTags } from "../utils/emotionUtils";
import { emotionColours } from "../utils/emotionColours";

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
      <Text style={styles.emotionName}>{emotion.replace("_", " ")}</Text>
    </View>
  );
}

// EmotionsDetected Component
function EmotionsDetected({ emotions }) {
  const [emotionsMeta, setEmotionMeta] = useState([]);

  useEffect(() => {
    if (emotions.length > 0) {
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
    }
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

// SummaryFeedback Component (Updated to Use Summarization)
function SummaryFeedback({ entry, topEmotions }) {
  const navigation = useNavigation();

  // State for summary and feedback
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  // State for scroll indicators
  const [scrollSummaryIndicator, setScrollSummaryIndicator] = useState({
    top: 0,
    height: 0,
  });
  const [scrollFeedbackIndicator, setScrollFeedbackIndicator] = useState({
    top: 0,
    height: 0,
  });

  // Loading text for summary and feedback
  const [loadingText, setLoadingText] = useState("Loading Summary");
  const [loadingFeedbackText, setLoadingFeedbackText] =
    useState("Loading Feedback");

  // Scroll handler
  const handleScroll = (event, setScrollIndicator, containerHeight) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollPosition = contentOffset.y;
    const totalScrollableHeight = contentSize.height - layoutMeasurement.height;

    const scrollPercentage =
      totalScrollableHeight > 0 ? scrollPosition / totalScrollableHeight : 0;

    const indicatorHeight =
      contentSize.height > layoutMeasurement.height
        ? (layoutMeasurement.height / contentSize.height) * containerHeight
        : 0;

    const newTop = scrollPercentage * (containerHeight - indicatorHeight);

    setScrollIndicator({
      top: newTop,
      height: indicatorHeight,
    });
  };

  const handleViewJournal = () => {
    navigation.navigate("MainTabs", {
      screen: "Home",
      params: { viewJournalEntry: entry },
    });
  };

  // Animate loading text
  useEffect(() => {
    if (loadingSummary) {
      const loadingTexts = [
        "Loading Summary.",
        "Loading Summary..",
        "Loading Summary...",
      ];
      let index = 0;

      const interval = setInterval(() => {
        setLoadingText(loadingTexts[index]);
        index = (index + 1) % loadingTexts.length;
      }, 500); // Change every 500ms

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [loadingSummary]);

  // Animate loading text for feedback
  useEffect(() => {
    if (loadingFeedback) {
      const loadingTexts = [
        "Loading Feedback.",
        "Loading Feedback..",
        "Loading Feedback...",
      ];
      let index = 0;

      const interval = setInterval(() => {
        setLoadingFeedbackText(loadingTexts[index]);
        index = (index + 1) % loadingTexts.length;
      }, 500); // Change every 500ms

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [loadingFeedback]);

  // Generate a personalized summary using entryText
  const generateReflectiveSummary = async () => {
    try {
      if (!entry || !entry.entryText) {
        setSummary(
          "No summary available. Please add more details to your entry."
        );
        setLoadingSummary(false);
        return;
      }

      setLoadingSummary(true);
      const reflectiveSummary = await getReflectiveSummary(entry.entryText);
      setSummary(reflectiveSummary);
    } catch (error) {
      console.error("Error generating summary:", error.message);
      setSummary("Error generating summary. Please try again.");
    } finally {
      setLoadingSummary(false);
    }
  };

  // Generate feedback
  const generateFeedback = async () => {
    try {
      // Handle both string and array types for entryText
      let textForAnalysis = "";

      if (Array.isArray(entry.entryText)) {
        textForAnalysis = entry.entryText
          .map((item) => item.response)
          .join(". "); // Combine responses for prompts
      } else if (
        typeof entry.entryText === "string" &&
        entry.entryText.trim()
      ) {
        textForAnalysis = entry.entryText.trim(); // Use free-writing text as-is
      }

      if (!textForAnalysis) {
        console.log(
          "Skipping feedback generation: No valid text for analysis."
        );
        setFeedback("Feedback not generated for this entry.");
        setLoadingFeedback(false);
        return;
      }

      setLoadingFeedback(true);
      const feedbackResult = await getFeedback(textForAnalysis, topEmotions);
      setFeedback(feedbackResult);
    } catch (error) {
      console.error("Error generating feedback:", error.message || error);
      setFeedback("Error generating feedback. Please try again.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  // Trigger both summary and feedback generation on mount or when emotions change
  useEffect(() => {
    if (topEmotions && topEmotions.length > 0) {
      generateReflectiveSummary();
      generateFeedback();
    }
  }, [entry, topEmotions]);

  return (
    <View>
      {/* Summary Section */}
      <Text style={styles.sectionTitleCentered}>Summary</Text>
      <View style={styles.summaryContainer}>
        {loadingSummary ? (
          <Text style={styles.summaryContent}>{loadingText}</Text>
        ) : (
          <View style={{ height: 200 }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20, // Add padding to the bottom to prevent content cutoff
              }}
              style={styles.summaryScrollContainer}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true} // Enable nested scrolling
            >
              <Text style={styles.summaryContent}>{summary}</Text>
            </ScrollView>
          </View>
        )}
      </View>

      {/* Feedback Section */}
      <Text style={styles.sectionTitleCentered}>Feedback</Text>
      <View style={styles.feedbackContainer}>
        {loadingFeedback ? (
          <Text style={styles.feedbackContent}>{loadingFeedbackText}</Text>
        ) : (
          <View style={{ height: 200 }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20, // Add padding to the bottom to prevent content cutoff
              }}
              style={styles.feedbackScrollContainer}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true} // Enable nested scrolling
            >
              <Text style={styles.feedbackContent}>{feedback}</Text>
            </ScrollView>
          </View>
        )}
      </View>

      <Tags emotions={topEmotions} entryText={entry.entryText || ""} />

      {/* View Journal Button */}
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

// Main Analysis Component (Passing Entry and TopEmotions to SummaryFeedback)
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
  const { entryId, entryTitle, entryText, journalDate, type } = entry;

  const [topEmotions, setTopEmotions] = useState([]);
  const [loadingEmotions, setLoadingEmotions] = useState(true);
  const [loadingEmotionsText, setLoadingEmotionsText] =
    useState("Loading emotions");

  const closeModal = () => {
    navigation.navigate("MainTabs", { screen: "Home" });
  };

  // Animate loading text for emotions
  useEffect(() => {
    let interval;

    if (loadingEmotions) {
      const loadingTexts = [
        "Loading emotions.",
        "Loading emotions..",
        "Loading emotions...",
      ];
      let index = 0;

      interval = setInterval(() => {
        setLoadingEmotionsText(loadingTexts[index]); // Update the text
        index = (index + 1) % loadingTexts.length; // Loop through the texts
      }, 500);
    }

    // Cleanup the interval
    return () => clearInterval(interval);
  }, [loadingEmotions]);

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
          setLoadingEmotions(false);
          return;
        }
        if (type === "prompts" && Array.isArray(entryText)) {
          // Combine all prompt responses into a single string
          textForAnalysis = entryText.map((item) => item.response).join(". "); // Join all responses with a period and space
        } else if (entryText) {
          // Use free-writing text as-is
          textForAnalysis = entryText;
        }

        const detectedEmotions = await getEmotion(textForAnalysis);

        if (!detectedEmotions || !Array.isArray(detectedEmotions)) {
          throw new Error("Invalid response from emotion analysis API.");
        }
        const filteredEmotions = filterEmotions(detectedEmotions);
        setTopEmotions(filteredEmotions);
        await parseTopEmotions(detectedEmotions);

        setLoadingEmotions(false);
      } catch (error) {
        console.error("Error fetching emotions:", error.message || error);
        setLoadingEmotions(false);
      }
    };

    fetchEmotions();
  }, [entry, entryId, entryText]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Header />
        <TouchableOpacity style={styles.exitButton} onPress={closeModal}>
          <Text style={styles.exitButtonText}>×</Text>
        </TouchableOpacity>
        <View style={styles.analysisHeader}>
          <Text style={styles.resultsText}>Analysis Results</Text>
          <View style={styles.gifContainer}>
            <Image
              source={require("../assets/books.gif")} // Replace with your actual GIF path
              style={styles.books}
              accessibilityLabel="Books GIF"
            />
          </View>
          <View style={styles.journalEntryContainer}>
            <Text style={styles.journalEntryTitle}>{entryTitle}</Text>
            <Text style={styles.journalEntryDate}>Date: {journalDate}</Text>
          </View>
        </View>
        {loadingEmotions ? (
          <View style={styles.emotionsLoadingContainer}>
            <Text style={styles.emotionsLoadingText}>
              {loadingEmotionsText}
            </Text>
          </View>
        ) : (
          <EmotionsDetected emotions={topEmotions} />
        )}
        <SummaryFeedback entry={entry} topEmotions={topEmotions} />
      </View>
    </ScrollView>
  );
}

function Tags({ emotions, entryText }) {
  if (!emotions || !Array.isArray(emotions) || emotions.length === 0) {
    return (
      <View style={styles.tagsContainer}>
        <Text style={styles.tagTitle}>Tags Related to Emotions</Text>
        <Text style={styles.noTagsText}>
          No emotions detected from the journal entry.
        </Text>
      </View>
    );
  }

  // Preprocess the entryText and combine it into a single string
  const processedText = (() => {
    if (Array.isArray(entryText)) {
      // Combine array responses into one string
      return entryText.map((item) => item.response).join(" ");
    } else if (typeof entryText === "string" && entryText.trim()) {
      // Use free-writing text as-is
      return entryText.trim();
    } else {
      console.warn("Invalid or empty journal entry text.");
      return ""; // Return an empty string if entryText is invalid
    }
  })();

  // Dynamically generate tags using getEmotionTags
  const emotionTags = getEmotionTags(emotions, processedText);

  return (
    <View style={styles.tagsContainer}>
      <Text style={styles.tagTitle}>Related Tags</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.tagScrollContainer}
      >
        {emotions.map((emotion, index) => {
          const emotionLabel = emotion.toLowerCase();
          const tags = emotionTags[emotionLabel] || [];
          const tagColor = emotionColours[emotionLabel] || "#E6E6E6"; // Default color if emotion not mapped

          return tags.length > 0
            ? tags.map((tag, idx) => (
                <View
                  key={`${emotion}-${idx}`}
                  style={[
                    styles.tag,
                    {
                      backgroundColor: tagColor, // Use emotionColours for color
                    },
                  ]}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))
            : null;
        })}
      </ScrollView>
    </View>
  );
}

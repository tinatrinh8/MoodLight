import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import styles from "../styles/AnalysisStyles";
import Header from "../components/Header"; // Use existing Header component
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { HUGGING_FACE_API_KEY } from "@env";
import { emotionData } from "../components/emotionData";

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

// Emotions Detected Component
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

// Summary and Feedback Component
function SummaryFeedback({ entry }) {
  const navigation = useNavigation();
  const handleViewJournal = () => {
    // Navigate to Home and pass the journal entry as a parameter
    navigation.navigate("MainTabs", {
      screen: "Home",
      params: { viewJournalEntry: entry },
    });
  };
  return (
    <View>
      {/* Summary Section */}
      <Text style={styles.sectionTitleCentered}>Summary</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryContent}>
          {"{Emotion Summary Content goes here...}"}
        </Text>
      </View>

      {/* Suggestions Section */}
      <Text style={styles.sectionTitleCentered}>Feedback</Text>
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsContent}>
          {"{Suggestions Content goes here...}"}
        </Text>
      </View>

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

// Analysis Component
export default function Analysis() {
  const route = useRoute();
  const ENTRY_DEFAULTS = {
    entryTitle: "something",
    entryText: "something",
    type: "something",
    journalDate: "MM/YYYY",
  };
  const entry = route.params !== undefined ? route.params : ENTRY_DEFAULTS;
  // this just sets the params to the defaults if the entry somehow isn't passed
  const { entryTitle, entryText, type, journalDate } = entry;
  const navigation = useNavigation(); // Use navigation hook

  const closeModal = () => {
    navigation.navigate("MainTabs", { screen: "Home" }); // Navigate to MainTabs and ensure Home tab is active
  };

  const [topEmotions, setTopEmotions] = useState([]);
  const [loadingEmotions, setLoadingEmotions] = useState(true);

  const getEmotion = (text) => {
    return axios
      .post(
        "https://api-inference.huggingface.co/models/borisn70/bert-43-multilabel-emotion-detection",
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          },
        }
      )
      .then((res) => res.data[0])
      .catch((e) => console.error("Error fetching sentiment", e));
  };

  const aggregateEmotions = (emotions) => {
    return emotions.map((r) => r.value).flat();
  };

const filterEmotions = (emotions) => {
  // Sort by score in descending order
  const sortedEmotions = emotions.sort((a, b) => b.score - a.score);

  // Extract unique emotions
  const uniqueEmotions = [];
  const seenLabels = new Set();

  for (const emotion of sortedEmotions) {
    if (!seenLabels.has(emotion.label.toLowerCase())) {
      uniqueEmotions.push(emotion.label.toLowerCase());
      seenLabels.add(emotion.label.toLowerCase());
    }

    // Stop once we have 3 unique emotions
    if (uniqueEmotions.length === 3) {
      break;
    }
  }

  return uniqueEmotions;
};


const parseTopEmotions = (emotions) => {
  const aggregatedEmotions = aggregateEmotions(emotions);
  const filteredEmotions = filterEmotions(aggregatedEmotions);
  setTopEmotions(filteredEmotions); // This will now include only unique emotions
};


  useEffect(() => {
    if (type === "free") {
      setLoadingEmotions(true);
      Promise.allSettled([getEmotion(entryText)]).then((results) =>
        parseTopEmotions(results)
      );
      setLoadingEmotions(false);
    } else {
      setLoadingEmotions(true);
      Promise.allSettled(
        entryText.map((text) => getEmotion(text["response"]))
      ).then((results) => parseTopEmotions(results));
      setLoadingEmotions(false);
    }
  }, [entryText, entryText, journalDate, type]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        <Header />

        {/* Exit Button */}
        <TouchableOpacity
          onPress={() => closeModal()}
          style={styles.exitButton}
        >
          <Text style={styles.exitButtonText}>×</Text>
        </TouchableOpacity>

        {/* Analysis Page Content */}
        <View style={styles.analysisHeader}>
          <View style={styles.titleContainer}></View>

          {/* Results Section */}
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsText}>Results</Text>
            <Image source={require("../assets/sofa.png")} style={styles.sofa} />
          </View>

          {/* Journal Entry Section */}
          <View style={styles.journalEntryContainer}>
            <View style={styles.journalEntryFrame} />
            <View style={styles.journalEntryContent}>
              <Text style={styles.journalEntryDate}>
                Journal Entry: {journalDate}
              </Text>
              <Text style={styles.journalEntryTitle}>{entryTitle}</Text>
            </View>
          </View>
        </View>

        {/* Emotions Detected Section */}
        {loadingEmotions ? (
          <></>
        ) : (
          <EmotionsDetected emotions={topEmotions} />
        )}
        {/* Summary and Feedback Section */}
        <SummaryFeedback entry={entry} />
      </View>
    </ScrollView>
  );
}

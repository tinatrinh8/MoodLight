import React, { useEffect, useContext, useRef, useState } from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import styles from "../styles/AnalysisStyles";
import Header from "../components/Header"; // Use existing Header component
import { useRoute } from "@react-navigation/native";

// Emotion Card Component
function EmotionCard({ rank, emotion, icon }) {
  return (
    <View style={styles.emotionCard}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>
      <Image
        accessibilityLabel={`${emotion} icon`}
        resizeMode="contain"
        source={icon}
        style={styles.emotionIcon}
      />
      <View style={styles.emotionNameContainer}>
        <Text style={styles.emotionName}>{emotion}</Text>
      </View>
    </View>
  );
}

// Emotions Detected Component
function EmotionsDetected() {
  const emotionsData = [
    {
      rank: 1,
      emotion: "Desire",
      icon: require("../assets/emojis/desire.png"),
    },
    {
      rank: 2,
      emotion: "Disgust",
      icon: require("../assets/emojis/disgust.png"),
    },
    {
      rank: 3,
      emotion: "Surprise",
      icon: require("../assets/emojis/surprise.png"),
    },
  ];

  return (
    <View style={styles.emotionsSection}>
      <Text style={styles.title}>Top Emotions Detected</Text>
      <View style={styles.emotionsContainer}>
        {emotionsData.map((emotion, index) => (
          <EmotionCard key={index} {...emotion} />
        ))}
      </View>
    </View>
  );
}

// Summary and Feedback Component
function SummaryFeedback() {
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
        accessibilityRole="button"
      >
        <Text style={styles.viewPromptText}>View Journal</Text>
      </TouchableOpacity>
    </View>
  );
}

// Analysis Component
export default function Analysis() {
  
  // FOLLOWING ARE FOR NLP
  const [ready, setReady] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [progressItems, setProgressItems] = useState([]);
  const [input, setInput] = useState('TEST EMOTION INPUT! I am having a tough time');
  const [output, setOutput] = useState('');

  const worker = useRef(null);

// FOLLOWING CODE SETS UP THE NLP PIPELINE

//  use the `useEffect` hook to setup the worker as soon as the `Analysis` component is mounted
useEffect(() => {
  if (!worker.current) {
    // Create the worker if it does not yet exist.
    worker.current = new Worker(new URL('./worker.js', import.meta.url), {
        type: 'module'
    });
  }

  // Create a callback function for messages from the worker thread.
  const onMessageReceived = (e) => {
    // in progress
  };

  // Attach the callback function as an event listener.
  worker.current.addEventListener('message', onMessageReceived);

  // Define a cleanup function for when the component is unmounted.
  return () => worker.current.removeEventListener('message', onMessageReceived);
});

  const route = useRoute();
  const ENTRY_DEFAULTS = {
    entryTitle: "something",
    entryText: "something",
    type: "something",
    journalDate: "MM/YYYY",
  };
  const entry = route.params !== undefined ? route.params : ENTRY_DEFAULTS;
  // this just sets the params to the defaults if the entry somehow isn't passed
  const {
    entryTitle,
    entryText,
    type,
    journalDate,
  } = entry;
  const navigation = useNavigation(); // Use navigation hook

  const closeModal = () => {
    navigation.navigate("MainTabs", { screen: "Home" }); // Navigate to MainTabs and ensure Home tab is active
  };

  // Function to get emotions
  const getEmotions = () => {
    worker.current.postMessage({
      text: entryText
    });
  }

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
              <Text style={styles.journalEntryTitle}>
                {entryTitle}
              </Text>
            </View>
          </View>
        </View>

        {/* Emotions Detected Section */}
        <EmotionsDetected />

        {/* Summary and Feedback Section */}
        <SummaryFeedback />
      </View>
    </ScrollView>
  );
}

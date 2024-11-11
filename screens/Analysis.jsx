import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import * as Font from "expo-font";
import AnalysisHeader from "../components/AnalysisHeader";
import styles from "../styles/AnalysisStyles";

// Header Component
function AnalysisHeader() {
  return (
    <View style={styles.AnalysisHeader}>
      <View style={styles.titleContainer}>
        <View style={styles.moodLightContainer}>
          <Text style={styles.moodLightText}>MoodLight</Text>
        </View>
        {/* Replace Exit Icon with a Text-based close button */}
        <TouchableOpacity
          accessibilityLabel="Exit button"
          style={styles.exitIcon}
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Results</Text>
        <Image source={require("../assets/sofa.png")} style={styles.sofa} />
      </View>
      <View style={styles.journalEntryContainer}>
        <View style={styles.journalEntryFrame} />
        <View style={styles.journalEntryContent}>
          <Text style={styles.journalEntryDate}>Journal Entry: dd/mm/yyyy</Text>
          <Text style={styles.journalEntryTitle}>{"{title of journal}"}</Text>
        </View>
      </View>
    </View>
  );
}

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
        source={{ uri: icon }}
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
      rank: 2,
      emotion: "Disgust",
      icon: require("../assets/disgust.png"),
    },
    {
      rank: 1,
      emotion: "Desire",
      icon: require("../assets/desire.png"),
    },
    {
      rank: 3,
      emotion: "Surprise",
      icon: require("../assets/surprised.png"),
    },
  ];

  return (
    <View style={styles.container}>
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
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryText}>{"{Emotion Summary}"}</Text>
          </View>
          <Text style={styles.sectionTitle}>Feedback</Text>
          <View style={styles.feedbackBox}>
            <View style={styles.feedbackContent} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewPromptButton}
          accessibilityRole="button"
        >
          <Text style={styles.viewPromptText}>View Journal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Main Component
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AnalysisHeader />
      <EmotionsDetected />
      <SummaryFeedback />
    </View>
  );
}

import React, { useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/AnalysisStyles";
import Header from "../components/Header";

// Emotion Card Component
function EmotionCard({ rank, emotion, score }) {
  return (
    <View style={styles.emotionCard}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>
      <View style={styles.emotionNameContainer}>
        <Text style={styles.emotionName}>{emotion}</Text>
      </View>
    </View>
  );
}

// Emotions Detected Component
function EmotionsDetected({ emotions }) {
  const topEmotions = emotions.slice(0, 3); // Only take the top 3 emotions

  return (
    <View style={styles.emotionsSection}>
      <Text style={styles.title}>Top Emotions Detected</Text>
      <View style={styles.emotionsContainer}>
        {topEmotions.map((emotion, index) => (
          <EmotionCard
            key={index}
            rank={index + 1}
            emotion={emotion.label}
            score={emotion.score}
          />
        ))}
      </View>
    </View>
  );
}

// Analysis Component
export default function Analysis() {
  const route = useRoute();
  const navigation = useNavigation();

  // Extract the passed data and unwrap the emotions array
  const {
    entryTitle = "Untitled Entry",
    journalDate = "Unknown Date",
    emotions: rawEmotions = [],
  } = route.params || {};

  // Unwrap the emotions array
  const emotions = Array.isArray(rawEmotions[0]) ? rawEmotions[0] : rawEmotions;

  useEffect(() => {
    console.log("Received emotions:", emotions);
  }, [emotions]);

  const closeModal = () => {
    navigation.navigate("MainTabs", { screen: "Home" });
  };

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

        {/* Analysis Header */}
        <View style={styles.analysisHeader}>
          <Text style={styles.resultsText}>Results</Text>
          {/* Bed/Sofa Image */}
          <Image
            source={require("../assets/sofa.png")}
            style={styles.sofa}
            accessibilityLabel="Bed or sofa image"
          />
        </View>

        {/* Journal Title and Date Section */}
        <View style={styles.journalEntryBox}>
          <Text style={styles.journalEntryTitle}>{entryTitle}</Text>
          <Text style={styles.journalEntryDate}>{journalDate}</Text>
        </View>

        {/* Emotions Detected Section */}
        <EmotionsDetected emotions={emotions} />

        {/* Summary Placeholder */}
        <View>
          <Text style={styles.sectionTitleCentered}>Summary</Text>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryContent}>
              {"This section will include a summary of the detected emotions."}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

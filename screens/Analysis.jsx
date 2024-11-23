import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import styles from "../styles/AnalysisStyles";
import Header from "../components/Header"; // Use existing Header component
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import { HUGGING_FACE_API_KEY } from "@env";
import { emotionData } from '../components/emotionData'

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
function EmotionsDetected({ emotions }) {
  const [emotionsMeta, setEmotionMeta] = useState([])
  useEffect(() => {
    setEmotionMeta([
      {
        rank: 1,
        emotion: emotions[0],
        icon: emotionData[emotions[0]],
      },
      {
        rank: 2,
        emotion: emotions[1],
        icon: emotionData[emotions[1]],
      },
      {
        rank: 3,
        emotion: emotions[2],
        icon: emotionData[emotions[2]],
      },
    ])
  }, [emotions])

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

  const [topEmotions, setTopEmotions] = useState([])
  const [loadingEmotions, setLoadingEmotions] = useState(true)

  const getEmotion = (text) => {
    return axios.post(
      "https://api-inference.huggingface.co/models/borisn70/bert-43-multilabel-emotion-detection",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
      }
    ).then(res => res.data[0]).catch(e => console.error('Error fetching sentiment', e))
  }

  const aggregateEmotions = (emotions) => {
    return emotions.map(r => r.value).flat()
  }

  const filterEmotions = (emotions) => {
    return emotions.sort(function (a, b) {
      return b.score - a.score;
    }).map(item => item.label.toLowerCase()).slice(0, 3);
  }

  const parseTopEmotions = (emotions) => {
    let aggregatedEmotions = aggregateEmotions(emotions)
    let filteredEmotions = filterEmotions(aggregatedEmotions)
    setTopEmotions(filteredEmotions)
  }
  useEffect(() => {
    if (type === 'free') {
      setLoadingEmotions(true)
      Promise.allSettled([getEmotion(entryText)]).then(results => parseTopEmotions(results))
      setLoadingEmotions(false)
    } else {
      setLoadingEmotions(true)
      Promise.allSettled(entryText.map(text => getEmotion(text['response']))).then(results => parseTopEmotions(results))
      setLoadingEmotions(false)
    }
  }, [entryText, entryText, journalDate, type])

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
        {
          loadingEmotions ? (<></>) : (<EmotionsDetected emotions={topEmotions} />)
        }
        {/* Summary and Feedback Section */}
        <SummaryFeedback />
      </View>
    </ScrollView>
  );
}

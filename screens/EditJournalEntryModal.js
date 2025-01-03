import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import styles from "../styles/HomePageStyles";
import { getEmotion } from '../utils/HuggingFaceAPI'

const EditJournalEntryModal = ({
  entry,
  onClose,
  onSave,
  setJournalEntries,
}) => {
  const [entryTitle, setEntryTitle] = useState(entry?.entryTitle || "");
  const [entryText, setEntryText] = useState(entry?.entryText || "");
  const [editedPrompts, setEditedPrompts] = useState(
    entry?.type === "prompts" ? entry.entryText : []
  );

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


  const refetchEmotions = async (entry) => {
    try {
      let textForAnalysis = "";

      if (entry.type === "prompts" && Array.isArray(entry.entryText)) {
        // Combine all prompt responses into a single string
        textForAnalysis = entry.entryText.map((item) => item.response).join(". "); // Join all responses with a period and space
      } else if (entry.entryText) {
        // Use free-writing text as-is
        textForAnalysis = entry.entryText;
      }

      console.log("Text for emotion analysis:", textForAnalysis);

      const detectedEmotions = await getEmotion(textForAnalysis);

      if (!detectedEmotions || !Array.isArray(detectedEmotions)) {
        throw new Error("Invalid response from emotion analysis API.");
      }
      return filterEmotions(detectedEmotions);

    } catch (error) {
      console.error("Error fetching emotions:", error.message || error);
    }
  }

  const handleSaveChanges = async () => {
    if (entry.type === "free") {
      if (!entryTitle.trim() || !entryText.trim()) {
        alert("Please provide a title and content.");
        return;
      }
    } else if (entry.type === "prompts") {
      if (!editedPrompts.length) {
        alert("Please ensure at least one response is provided.");
        return;
      }
    }

    const updatedEntry = {
      ...entry,
      entryTitle,
      entryText: entry.type === "prompts" ? editedPrompts : entryText,
    };
    
    const updatedEmotions = await refetchEmotions(updatedEntry)
    updatedEntry['topEmotions'] = updatedEmotions

    try {
      await onSave(updatedEntry.id, updatedEntry);
      onClose(updatedEntry);
    } catch (error) {
      console.error("Error saving changes:", error.message);
    }
  };

  const confirmDiscardChanges = () => {
    Alert.alert(
      "Discard Changes?",
      "Are you sure you want to discard your changes?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: onClose },
      ]
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          style={styles.modalContent}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity
            onPress={confirmDiscardChanges}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <ScrollView>
            <Text style={styles.modalTitle}>Edit Journal Entry</Text>
            <Text style={styles.modalDateText}>{entry.journalDate}</Text>

            <TextInput
              style={styles.titleInputBox}
              value={entryTitle}
              onChangeText={setEntryTitle}
              placeholder="Edit your journal title"
            />

            {entry.type === "free" ? (
              <TextInput
                style={styles.textInputBox}
                value={entryText}
                onChangeText={(text) => setEntryText(text)}
                multiline={true} // Enable multiline
                placeholder="Edit your journal content"
                textAlignVertical="top" // Ensure text starts at the top
                autoCorrect={true} // Optional: Enable auto-correct
                autoCapitalize="sentences" // Capitalize sentences
              />
            ) : (
              <ScrollView>
                {editedPrompts.map((prompt, index) => (
                  <View key={index} style={styles.promptContainer}>
                    <Text style={styles.textBoxTitle}>{prompt.prompt}</Text>
                    <TextInput
                      style={styles.textInputBox}
                      value={prompt.response}
                      onChangeText={(text) => {
                        const updatedPrompts = editedPrompts.filter((p, i) =>
                          i === index ? text.trim() !== "" : true
                        );
                        if (text.trim() !== "") {
                          updatedPrompts[index] = {
                            ...prompt,
                            response: text,
                          };
                        }
                        setEditedPrompts(updatedPrompts);
                      }}
                      placeholder="Edit your response"
                      multiline={true} // Enable multiline for prompts too
                      textAlignVertical="top" // Ensure text starts at the top
                    />
                  </View>
                ))}
              </ScrollView>
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.saveChangesButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.continueButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default EditJournalEntryModal;

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

    try {
      await onSave(updatedEntry, setJournalEntries);
      onClose();
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
          <TouchableOpacity onPress={confirmDiscardChanges} style={styles.closeButton}>
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
                onChangeText={setEntryText}
                multiline={true}
                placeholder="Edit your journal content"
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
                    />
                  </View>
                ))}
              </ScrollView>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.saveChangesButton} onPress={handleSaveChanges}>
            <Text style={styles.continueButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default EditJournalEntryModal;

import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import styles from "../styles/HomePageStyles";
import { useNavigation } from "@react-navigation/native";

const journalOptions = [
  {
    title: "Write Freely",
    selectDescription: "Let your thoughts flow without any guidance",
  },
  {
    title: "Use Prompts",
    selectDescription: "Answer helpful questions to explore your feelings",
  },
];

const HomePage = () => {
  const contentData = [
    {
      id: "greeting",
      component: (
        <View style={styles.greetingContainer}>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingText}>Hello, User</Text>
            <Text style={styles.greetingSubtitleText}>Welcome Home</Text>
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>N</Text>
          </View>
        </View>
      ),
    },
    { id: "search", component: <SearchBar /> },
    { id: "title", component: <Title /> },
    { id: "pastEntries", component: <PastEntries /> },
    { id: "createEntry", component: <CreateJournalEntry /> },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={contentData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.component}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const CreateJournalEntry = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [writeFreelyModalVisible, setWriteFreelyModalVisible] = useState(false);
  const [usePromptsModalVisible, setUsePromptsModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    setWriteFreelyModalVisible(false);
    setUsePromptsModalVisible(false);
  };

  const openWriteFreelyModal = () => {
    setModalVisible(false);
    setWriteFreelyModalVisible(true);
  };

  const openUsePromptsModal = () => {
    setModalVisible(false);
    setUsePromptsModalVisible(true);
  };

  return (
    <View style={styles.createEntryContainer}>
      <Image source={require("../assets/cat.png")} style={styles.cat} />
      <Text style={styles.createEntryText}>Create New Journal Entry</Text>
      <View style={styles.buttonAndCraneContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <Image source={require("../assets/crane.png")} style={styles.crane} />
      </View>

      {/* Main Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>How would you like to journal today?</Text>
            {journalOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.journalOption}
                onPress={() => {
                  if (option.title === "Write Freely") {
                    openWriteFreelyModal();
                  } else if (option.title === "Use Prompts") {
                    openUsePromptsModal();
                  }
                }}
              >
                <View>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.selectDescription}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Write Freely Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={writeFreelyModalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Dear diary...</Text>
            <Text style={styles.journalSubtitle}>Journal Title: dd/mm/yyyy</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="User Text Here"
              placeholderTextColor="#A9A9A9"
              multiline={true}
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => {
                closeModal();
                navigation.navigate("Analysis");
              }}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Use Prompts Modal */}
{/* Use Prompts Modal */}
<Modal
  animationType="fade"
  transparent={true}
  visible={usePromptsModalVisible}
  onRequestClose={closeModal}
>
  <KeyboardAvoidingView
    style={styles.modalOverlay}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.modalContent}>
      {/* Close Button */}
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.modalTitle}>Need a little inspiration?</Text>
        <Text style={styles.modalSubtitle}>Please fill out at least 3 prompts.</Text>
        <Text style={styles.journalSubtitle}>Journal Title: dd/mm/yyyy</Text>

        <Text style={styles.textBoxTitle}>Prompt 1</Text>
        <TextInput
          style={styles.textInputBox}
          placeholder="Answer the prompt here..."
          placeholderTextColor="#A9A9A9"
          multiline={true}
          textAlignVertical="top"
        />
        <Text style={styles.textBoxTitle}>Prompt 2</Text>
        <TextInput
          style={styles.textInputBox}
          placeholder="Answer the prompt here..."
          placeholderTextColor="#A9A9A9"
          multiline={true}
          textAlignVertical="top"
        />
        <Text style={styles.textBoxTitle}>Prompt 3</Text>
        <TextInput
          style={styles.textInputBox}
          placeholder="Answer the prompt here..."
          placeholderTextColor="#A9A9A9"
          multiline={true}
          textAlignVertical="top"
        />
        <Text style={styles.textBoxTitle}>Prompt 4</Text>
        <TextInput
          style={styles.textInputBox}
          placeholder="Answer the prompt here..."
          placeholderTextColor="#A9A9A9"
          multiline={true}
          textAlignVertical="top"
        />
        <Text style={styles.textBoxTitle}>Prompt 5</Text>
        <TextInput
          style={styles.textInputBox}
          placeholder="Answer the prompt here..."
          placeholderTextColor="#A9A9A9"
          multiline={true}
          textAlignVertical="top"
        />

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            closeModal();
            navigation.navigate("Analysis");
          }}
        >
          <Text style={styles.continueButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  </KeyboardAvoidingView>
</Modal>
    </View>
  );
};

const SearchBar = () => (
  <View style={styles.searchBar}>
    <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#555" />
    <TouchableOpacity>
      <Text style={styles.closeButton}>×</Text>
    </TouchableOpacity>
  </View>
);

const Title = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.titleText}>Let’s Start Journaling</Text>
    <Text style={styles.subtitle}>Shall we?</Text>
    <Image source={require("../assets/shelf.png")} style={styles.shelf} />
    <Text style={styles.quote}>“Quote of the day”</Text>
  </View>
);

const PastEntries = () => (
  <View style={styles.pastEntries}>
    <Text style={styles.pastEntriesTitle}>Past Entries</Text>
    <View style={styles.entryContainer}>
      {[
        { id: 1, title: "Yesterday", color: "#C21840" },
        { id: 2, title: "2 Days Ago", color: "#6FBCAE" },
        { id: 3, title: "3 Days Ago", color: "#787392" },
        { id: 4, title: "View All", color: "#4B4B4B" },
      ].map((entry) => (
        <TouchableOpacity key={entry.id} style={[styles.entryButton, { backgroundColor: entry.color }]}>
          <Text style={styles.entryText}>{entry.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default HomePage;

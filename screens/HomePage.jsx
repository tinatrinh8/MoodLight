import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  ScrollView,
  Animated,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/firebase";
import Header from "../components/Header";
import styles from "../styles/HomePageStyles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {
  addJournalEntry,
  getJournalEntries,
  handleSavePromptEntry,
} from "../functions/JournalFunctions";
import prompts from "../assets/prompts";
import quotes from "../assets/Quotes";
import { useEntryDates } from "../components/EntryDatesContext"; // Import EntryDatesContext

const SearchBar = () => (
  <View style={styles.searchBar}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search Past Entries?"
      placeholderTextColor="#555"
    />
    <TouchableOpacity>
      <Text style={styles.closeButton}>×</Text>
    </TouchableOpacity>
  </View>
);

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { entryDates, setEntryDates } = useEntryDates(); // Access EntryDatesContext

  const [viewJournalModalVisible, setViewJournalModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(getRandomQuote());
  const [newEntryText, setNewEntryText] = useState("");
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [createEntryModalVisible, setCreateEntryModalVisible] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const entries = await getJournalEntries();
      const dates = entries.map((entry) =>
        new Date(entry.date.seconds * 1000).toISOString().split("T")[0]
      );

      setJournalEntries(entries);
      setEntryDates(dates);
    } catch (error) {
      console.error("Error fetching journal entries:", error.message);
    } finally {
      setLoading(false);
    }
  }, [setEntryDates]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    fetchEntries();

    return () => {
      unsubscribeAuth();
    };
  }, [fetchEntries]);

  useEffect(() => {
    if (route.params?.entry) {
      setViewJournalModalVisible(true);
    }
  }, [route.params]);

  const handleSaveEntry = async () => {
    if (newEntryTitle.trim() && newEntryText.trim()) {
      const currentDate = new Date().toISOString().split("T")[0];
      try {
        await addJournalEntry(newEntryText, newEntryTitle);
        setNewEntryTitle("");
        setNewEntryText("");
        closeModal();

        // Update entries and dates
        const updatedEntries = await getJournalEntries();
        setJournalEntries(updatedEntries);

        // Add the new date to entryDates if not already present
        setEntryDates((prevDates) =>
          prevDates.includes(currentDate) ? prevDates : [...prevDates, currentDate]
        );
      } catch (error) {
        console.error("Error saving entry:", error.message);
      }
    } else {
      alert("Please provide both a title and content before saving.");
    }
  };

  const closeModal = () => {
    setCreateEntryModalVisible(false);
  };

  const contentData = [
    {
      id: "greeting",
      component: (
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Hello, {user?.displayName ? user.displayName.split(" ")[0] : "User"}
          </Text>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text style={styles.profileText}>
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    },
    { id: "search", component: <SearchBar /> },
    { id: "title", component: <Title quote={quote} /> },
    {
      id: "pastEntries",
      component: (
        <PastEntries
          openViewJournalModal={setViewJournalModalVisible}
          journalEntries={journalEntries}
          loading={loading}
        />
      ),
    },
    {
      id: "createEntry",
      component: (
        <CreateJournalEntry
          newEntryText={newEntryText}
          setNewEntryText={setNewEntryText}
          newEntryTitle={newEntryTitle}
          setNewEntryTitle={setNewEntryTitle}
          modalVisible={createEntryModalVisible}
          setModalVisible={setCreateEntryModalVisible}
          handleSaveEntry={handleSaveEntry}
        />
      ),
    },
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


const CreateJournalEntry = ({
  navigation,
  newEntryText,
  setNewEntryText,
  modalVisible,
  setModalVisible,
  setJournalEntries,
}) => {
  const [currentModal, setCurrentModal] = useState("main");
  const [promptResponses, setPromptResponses] = useState(Array(5).fill(""));
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [promptEntryTitle, setPromptEntryTitle] = useState("");
  const [randomPrompts, setRandomPrompts] = useState([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeTransition = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const switchModal = (type) => {
    fadeTransition();
    setTimeout(() => setCurrentModal(type), 200);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentModal("main");
  };

  const openPromptsModal = () => {
    const shuffledPrompts = prompts.sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomPrompts(shuffledPrompts);
    switchModal("usePrompts");
  };

const savePromptEntry = async () => {
  if (promptEntryTitle.trim() && promptResponses.some((response) => response.trim())) {
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      const filteredResponses = promptResponses.filter((response) => response.trim());
      const entryText = filteredResponses.join("\n\n");
      await addJournalEntry(entryText, promptEntryTitle);

      setPromptResponses(Array(5).fill(""));
      setPromptEntryTitle("");
      closeModal();

      // Fetch updated entries and dates
      const updatedEntries = await getJournalEntries();
      setJournalEntries(updatedEntries);

      // Add the new entry date to entryDates if not already present
      setEntryDates((prevDates) =>
        prevDates.includes(currentDate) ? prevDates : [...prevDates, currentDate]
      );
    } catch (error) {
      console.error("Error saving prompt entry:", error.message);
    }
  } else {
    alert("Please provide a title and at least one response.");
  }
};


const handleSaveEntry = async () => {
  if (newEntryTitle.trim() && newEntryText.trim()) {
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    await addJournalEntry(newEntryText, newEntryTitle);

    setNewEntryTitle("");
    setNewEntryText("");
    closeModal();

    // Fetch updated entries and dates
    const updatedEntries = await getJournalEntries();
    setJournalEntries(updatedEntries);

    // Add the new entry date to entryDates if not already present
    setEntryDates((prevDates) =>
      prevDates.includes(currentDate) ? prevDates : [...prevDates, currentDate]
    );
  } else {
    alert("Please provide both a title and content before saving.");
  }
};

  return (
    <View style={styles.createEntryContainer}>
      <Image source={require("../assets/cat.png")} style={styles.cat} />
      <Text style={styles.createEntryText}>Create a New Journal Entry</Text>
      <View style={styles.buttonAndCraneContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setModalVisible(true);
            setCurrentModal("main");
          }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <Image source={require("../assets/crane.png")} style={styles.crane} />
      </View>

      {/* Unified Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            {currentModal === "main" && (
              <>
                <Text style={styles.modalTitle}>
                  How would you like to journal today?
                </Text>
                <TouchableOpacity
                  style={styles.journalOption}
                  onPress={() => switchModal("writeFreely")}
                >
                  <Text style={styles.optionTitle}>Write Freely</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.journalOption}
                  onPress={openPromptsModal}
                >
                  <Text style={styles.optionTitle}>Use Prompts</Text>
                </TouchableOpacity>
              </>
            )}
            {currentModal === "writeFreely" && (
              <>
                <Text style={styles.modalTitle}>Dear diary...</Text>
                <TextInput
                  style={styles.titleInputBox}
                  placeholder="Name your journal entry"
                  value={newEntryTitle}
                  onChangeText={setNewEntryTitle}
                />
                <TextInput
                  style={styles.textInputBox}
                  placeholder="Write your thoughts here..."
                  multiline={true}
                  value={newEntryText}
                  onChangeText={setNewEntryText}
                />
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleSaveEntry}
                >
                  <Text style={styles.continueButtonText}>Save Entry</Text>
                </TouchableOpacity>
              </>
            )}
            {currentModal === "usePrompts" && (
              <>
                <Text style={styles.modalTitle}>
                  Need a little inspiration?
                </Text>
                <Text style={styles.textBoxTitle}>Journal Title</Text>
                <TextInput
                  style={styles.titleInputBox}
                  placeholder="Name your journal entry"
                  value={promptEntryTitle}
                  onChangeText={setPromptEntryTitle}
                />
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  {randomPrompts.map((prompt, index) => (
                    <View key={index} style={styles.promptContainer}>
                      <Text style={styles.textBoxTitle}>{prompt}</Text>
                      <TextInput
                        style={styles.textInputBox}
                        placeholder="Write your answer here..."
                        multiline={true}
                        value={promptResponses[index]}
                        onChangeText={(text) => {
                          const updatedResponses = [...promptResponses];
                          updatedResponses[index] = text;
                          setPromptResponses(updatedResponses);
                        }}
                      />
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={savePromptEntry}
                >
                  <Text style={styles.continueButtonText}>Save Entry</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const Title = ({ quote }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.titleText}>Let’s Start Journaling</Text>
    <Text style={styles.subtitle}>Shall we?</Text>
    <Image source={require("../assets/shelf.png")} style={styles.shelf} />
    <Text style={styles.quote}>“{quote}”</Text>
  </View>
);

const PastEntries = ({ openViewJournalModal, journalEntries, loading, entryDates }) => {
  if (loading) {
    return <Text style={styles.loadingText}>Loading entries...</Text>;
  }

  if (!journalEntries.length) {
    return <Text style={styles.emptyText}>No journal entries yet.</Text>;
  }

  const recentEntries = journalEntries
    .sort((a, b) => b.date.seconds - a.date.seconds)
    .slice(0, 4);

  return (
    <View style={styles.pastEntries}>
      <Text style={styles.pastEntriesTitle}>Past Entries</Text>
      <View style={styles.entryContainer}>
        {recentEntries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={styles.entryButton}
            onPress={() => openViewJournalModal(entry)}
          >
            <Text style={styles.entryText}>
              {entry.entryTitle || "Untitled Entry"}
            </Text>
            <Text style={styles.dateText}>
              {entry.date
                ? new Date(entry.date.seconds * 1000).toLocaleDateString()
                : "No Date"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


export default HomePage;

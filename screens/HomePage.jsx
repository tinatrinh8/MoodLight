import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from "react";
import {
  View,
  SafeAreaView,
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
  Alert,
  ActivityIndicator,
  InteractionManager,
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
  deleteJournalEntry,
  updateJournalEntry,
} from "../functions/JournalFunctions";
import prompts from "../assets/prompts";
import quotes from "../assets/Quotes";
import { useJournalContext } from "../components/EntryDatesContext"; // Import the context
import { useEntryDates } from "../components/EntryDatesContext"; // Import context
import { utcToZonedTime, format } from "date-fns-tz";
import { formatDateToTimezone } from "../utils/DateUtils";
import EditJournalEntryModal from "../screens/EditJournalEntryModal";
import LoadingFlower from "../components/LoadingFlower";
import { getSuggestedPrompts } from "../components/SuggestedPrompts";
import { SearchArea } from "../components/SearchArea";
import { getEmotion } from "../utils/HuggingFaceAPI";
import { getDailyDosAndDonts } from "../components/RandomDosAndDonts.js";

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const ViewJournalEntryModal = ({
  entry,
  onClose,
  setJournalEntries,
  setEntryDates,
  setSelectedEntry,
  setEditModalVisible,
  navigation,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <ScrollView style={styles.scrollContentView}>
            <Text style={styles.modalTitle}>{entry.entryTitle}</Text>
            <Text style={styles.modalDateText}>{entry.journalDate}</Text>

            {entry.type === "free" ? (
              <View style={styles.promptResponseContainer}>
                <Text style={styles.responseText}>
                  {entry.entryText || "No content available"}
                </Text>
              </View>
            ) : Array.isArray(entry.entryText) ? (
              entry.entryText.map((item, index) => (
                <View key={index} style={styles.promptContainer}>
                  {/* Prompt as a standalone title */}
                  <Text style={styles.textBoxTitle}>{item.prompt}</Text>
                  {/* Response in its own box */}
                  <View style={styles.responseBox}>
                    <Text style={styles.responseText}>
                      {item.response || "No response provided"}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.modalViewText}>No prompts available</Text>
            )}
          </ScrollView>

          <View style={styles.fixedButtonsContainer}>
            <TouchableOpacity
              style={styles.analysisButton}
              onPress={() => {
                setSelectedEntry(entry); // Set the entry to be analysed (just in case)
                onClose(); // Close the view modal
                navigation.navigate("Analysis", { ...entry }); // go to Analysis
              }}
            >
              <Text style={styles.continueButtonText}>Analysis</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setSelectedEntry(entry); // Set the entry to be edited
                setEditModalVisible(true); // Open the edit modal
                onClose(); // Close the view modal
              }}
            >
              <Text style={styles.continueButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  "Confirm Deletion",
                  "Are you sure you want to delete this journal entry? This action cannot be undone.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Yes, Delete",
                      style: "destructive",
                      onPress: async () => {
                        try {
                          // Call delete function and remove from Firestore
                          await deleteJournalEntry(entry.id);

                          // Update the journal entries state to reflect deletion
                          setJournalEntries((prevEntries) =>
                            prevEntries.filter((e) => e.id !== entry.id)
                          );

                          // Update the entry dates state
                          setEntryDates((prevDates) =>
                            prevDates.filter(
                              (date) => date !== entry.journalDate
                            )
                          );

                          // Close the modal
                          onClose();

                          console.log("Journal entry deleted successfully.");
                        } catch (error) {
                          console.error(
                            "Error deleting journal entry:",
                            error.message
                          );
                        }
                      },
                    },
                  ]
                );
              }}
            >
              <Text style={styles.continueButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { entryDates, setEntryDates, journalEntries, setJournalEntries } =
    useEntryDates(); // Use global state
  const [viewJournalEntry, setViewJournalEntry] = useState(null); // State to hold the selected journal entry
  const [viewJournalModalVisible, setViewJournalModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(getRandomQuote());
  const [newEntryText, setNewEntryText] = useState("");
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [createEntryModalVisible, setCreateEntryModalVisible] = useState(false);
  const [newEntryDate, setNewEntryDate] = useState(""); // New state for the selected date
  const [editModalVisible, setEditModalVisible] = useState(false); // Controls visibility of edit modal
  const [selectedEntry, setSelectedEntry] = useState(null); // Stores the entry being edited
  const translateY = useRef(new Animated.Value(-300)).current; // Start from above the screen
  const opacity = useRef(new Animated.Value(0)).current; // Start with transparent flowers
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);
  const [loadingPrompts, setLoadingPrompts] = useState(true); // State for loading prompts
  const [dailySuggestions, setDailySuggestions] = useState({
    dos: [],
    donts: [],
  });

  // Dos and Donts
  useEffect(() => {
    const suggestions = getDailyDosAndDonts();
    setDailySuggestions(suggestions);
  }, []);

  // used to fetch prompts when the component mounts
  const fetchPrompts = async () => {
    try {
      setLoadingPrompts(true);
      // Fetch the user's journal entries from Firestore
      const journalEntries = await getJournalEntries();

      // Use those entries to generate suggested prompts
      const prompts = await getSuggestedPrompts(journalEntries);

      // Set the generated prompts to the state
      setSuggestedPrompts(prompts);
    } catch (error) {
      console.error("Error fetching suggested prompts:", error);
    } finally {
      setLoadingPrompts(false);
    }
  };

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const entries = await getJournalEntries();

      // Extract journal dates directly as strings
      const dates = entries.map((entry) => entry.journalDate); // Use journalDate directly

      setJournalEntries(entries);
      setEntryDates(dates); // Store dates as strings
    } catch (error) {
      console.error("Error fetching journal entries:", error.message);
    } finally {
      setLoading(false);
    }
  }, [setEntryDates, setJournalEntries]);

  // Helper function to reset newEntryDate to today's date
  const resetToTodayDate = () => {
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(new Date()); // Format to YYYY-MM-DD
    setNewEntryDate(today); // Set today's date
    console.log("New entry date set to:", today);
  };
  const handleOpenJournal = (entry) => {
    setViewJournalEntry(entry); // Set the clicked journal entry
    setViewJournalModalVisible(true); // Open the modal
  };

  const handleCloseJournal = () => {
    setViewJournalModalVisible(false); // Close the modal
    setViewJournalEntry(null); // Clear the selected entry
  };

  // Trigger background animation
  useEffect(() => {
    fetchPrompts();
    fetchEntries();

    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0, // Flowers move into view
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1, // Flowers fade in
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fetchEntries]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the authenticated user
        console.log("Authenticated user UID:", currentUser.uid); // Log the UID for debugging or usage
      } else {
        setUser(null);
        console.error("User is not authenticated."); // Handle unauthenticated state
      }
    });

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      // Check if a journal entry is passed from navigation
      if (route.params?.viewJournalEntry) {
        handleOpenJournal(route.params.viewJournalEntry);
        navigation.setParams({ viewJournalEntry: null }); // Clear params
      }

      if (route.params?.selectedDate) {
        console.log("Creating entry for date:", route.params.selectedDate);
        setNewEntryDate(route.params.selectedDate); // Set the selected date for the new entry
        setCreateEntryModalVisible(true); // Open the modal for creating an entry
        console.log("Modal visibility set to true");
        navigation.setParams({ selectedDate: null }); // Clear params
      }
    });

    return () => {
      interactionPromise.cancel();
      unsubscribeAuth();
    };
  }, [fetchEntries, route.params]);

  const handleSaveEntry = async () => {
    if (newEntryTitle.trim() && newEntryText.trim()) {
      try {
        // Detect emotions for the entry text
        const detectedEmotions = await getEmotion(newEntryText);
        const topEmotions = detectedEmotions
          .sort((a, b) => b.score - a.score) // Sort by score
          .slice(0, 3) // Get top 3 emotions
          .map((emotion) => emotion.label.toLowerCase()); // Extract emotion labels

        // Save the entry with top emotions
        const addedEntry = await addJournalEntry(
          newEntryText,
          newEntryTitle,
          newEntryDate,
          "free",
          topEmotions // Pass top emotions to Firestore
        );

        console.log("Saved with emotions:", topEmotions);
        navigation.navigate("Analysis", {
          entryId: addedEntry.id,
          entryTitle: addedEntry.entryTitle,
          entryText: addedEntry.entryText,
          type: addedEntry.type,
          journalDate: addedEntry.journalDate,
          topEmotions: addedEntry.topEmotions, // Pass to Analysis screen
        });
      } catch (error) {
        console.error("Error saving entry:", error.message);
      }
    } else {
      alert("Please provide both a title and content.");
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
              {user?.displayName
                ? user.displayName.charAt(0).toUpperCase()
                : "U"}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      id: "search",
      component: <SearchArea handleOpenJournal={handleOpenJournal} />,
    },
    { id: "title", component: <Title quote={quote} /> },

    {
      id: "dailyDosAndDonts",
      component:
        ((<getDailyDosAndDonts dailySuggestions={dailySuggestions} />),
        (
          <View style={styles.dosAndDontsContainer}>
            {/* Do's Section */}
            <View style={styles.dosColumn}>
              <Text style={styles.dosHeader}>Today's Do's</Text>
              {dailySuggestions.dos.map((item, index) => (
                <Text key={index} style={styles.dosText}>
                  {item}
                </Text>
              ))}
            </View>

            {/* Don'ts Section */}
            <View style={styles.dontsColumn}>
              <Text style={styles.dontsHeader}>Today's Don'ts</Text>
              {dailySuggestions.donts.map((item, index) => (
                <Text key={index} style={styles.dontsText}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        )),
    },

    {
      id: "pastEntries",
      component: (
        <PastEntries
          openViewJournalModal={handleOpenJournal} // Pass the callback
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
          newEntryDate={newEntryDate} // Pass the selected or default date
          setNewEntryTitle={setNewEntryTitle}
          modalVisible={createEntryModalVisible}
          setModalVisible={setCreateEntryModalVisible}
          handleSaveEntry={handleSaveEntry}
          onResetToTodayDate={resetToTodayDate} // Pass down the reset function
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Animated GIF Background */}
      <Animated.Image
        source={require("../assets/flowers.gif")} // Use your GIF file
        style={[
          styles.flowerGif,
          {
            transform: [{ translateY }], // Move GIF vertically
            opacity, // Fade effect
          },
        ]}
      />
      <Header />
      {/* View Journal Entry Modal */}
      {viewJournalModalVisible && viewJournalEntry && (
        <ViewJournalEntryModal
          entry={viewJournalEntry}
          onClose={handleCloseJournal}
          setJournalEntries={setJournalEntries}
          setEntryDates={setEntryDates}
          setSelectedEntry={setSelectedEntry} // Pass setSelectedEntry
          setEditModalVisible={setEditModalVisible} // Pass setEditModalVisible
          navigation={navigation}
        />
      )}

      {editModalVisible && selectedEntry && (
        <EditJournalEntryModal
          entry={selectedEntry}
          onClose={(entry) => {
            setEditModalVisible(false);
            navigation.navigate("Analysis", { ...entry });
          }}
          onSave={updateJournalEntry} // Correctly pass the onSave function here
          setJournalEntries={setJournalEntries} // Pass the state updater
        />
      )}

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
  modalVisible,
  setModalVisible,
  newEntryDate, // New prop added for selected or default date
  onResetToTodayDate, // Renamed to explicitly indicate it
}) => {
  const navigation = useNavigation(); // Access navigation directly
  const { entryDates, setEntryDates, setJournalEntries } = useEntryDates(); // Pull from context
  const [currentModal, setCurrentModal] = useState("main");
  const [newEntryText, setNewEntryText] = useState("");
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [promptResponses, setPromptResponses] = useState(Array(5).fill(""));
  const [promptEntryTitle, setPromptEntryTitle] = useState("");
  const [randomPrompts, setRandomPrompts] = useState([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);
  const [loadingPrompts, setLoadingPrompts] = useState(true);

  // Fetch prompts based on user's past journal entries
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        // Fetch journal entries from Firestore
        const journalEntries = await getJournalEntries();

        // Use the fetched journal entries to generate AI prompts
        const prompts = await getSuggestedPrompts(journalEntries);

        // Set the prompts to state
        setSuggestedPrompts(prompts);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      } finally {
        setLoadingPrompts(false);
      }
    };

    if (currentModal === "usePrompts") {
      fetchPrompts();
    }
  }, [currentModal]);

  // Determine the displayed date
  const displayedDate = newEntryDate; // Always use the prop value

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
    setCurrentModal("main"); // Reset to the main modal
  };

  const openPromptsModal = () => {
    const shuffledPrompts = prompts.sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomPrompts(shuffledPrompts);
    switchModal("usePrompts");
  };

  const savePromptEntry = async () => {
    try {
      if (!promptEntryTitle.trim()) {
        alert("Please provide a title for your journal entry.");
        return;
      }
      if (!promptResponses.some((response) => response.trim())) {
        alert("Please provide at least one response to the prompts.");
        return;
      }

      const promptsData = randomPrompts
        .map((prompt, index) => ({
          prompt,
          response: promptResponses[index]?.trim() || "",
        }))
        .filter((item) => item.response); // Filter out empty responses

      console.log("Saving prompt-based journal entry:", {
        promptsData,
        promptEntryTitle,
        displayedDate,
        type: "prompts",
      });

      const addedEntry = await addJournalEntry(
        promptsData,
        promptEntryTitle,
        displayedDate,
        "prompts"
      );

      // Combine responses into a single string for analysis
      const combinedResponses = promptsData
        .map((item) => item.response)
        .join(". ");

      closeModal();
      navigation.navigate("Analysis", {
        entryId: addedEntry.id,
        entryTitle: addedEntry.entryTitle,
        entryText: combinedResponses, // Pass concatenated text
        type: addedEntry.type,
        journalDate: addedEntry.journalDate,
        promptsData, // Pass full prompts data if needed
      });

      console.log("Prompt-based journal entry saved successfully.");
    } catch (error) {
      console.error("Error saving prompt entry:", error.message);
      alert(
        "An error occurred while saving the journal entry. Please try again."
      );
    }
  };

  const handleSaveEntry = async () => {
    if (newEntryTitle.trim() && newEntryText.trim()) {
      try {
        const addedEntry = await addJournalEntry(
          newEntryText,
          newEntryTitle,
          newEntryDate,
          "free"
        );

        closeModal();
        navigation.navigate("Analysis", {
          entryId: addedEntry.id,
          entryTitle: addedEntry.entryTitle,
          entryText: newEntryText,
          type: addedEntry.type,
          journalDate: addedEntry.journalDate,
        });

        console.log("Free-writing journal entry saved successfully.");
      } catch (error) {
        console.error("Error saving entry:", error.message);
        alert(
          "An error occurred while saving the journal entry. Please try again."
        );
      }
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
            onResetToTodayDate();
            setModalVisible(true);
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

            {/* Write Freely Modal */}
            {currentModal === "writeFreely" && (
              <>
                <Text style={styles.modalTitle}>Dear diary...</Text>
                <Text style={styles.dateText}>{displayedDate}</Text>

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
                {/* Save Entry for Write Freely */}
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleSaveEntry}
                >
                  <Text style={styles.continueButtonText}>Save Entry</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Use Prompts Modal */}
            {currentModal === "usePrompts" && (
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 200,
                }}
              >
                <Text style={styles.modalTitle}>
                  Need a little inspiration?
                </Text>
                <Text style={styles.dateText}>{displayedDate}</Text>

                <Text style={styles.textBoxTitle}>Journal Title</Text>
                <TextInput
                  style={styles.titleInputBox}
                  placeholder="Name your journal entry"
                  value={promptEntryTitle}
                  onChangeText={setPromptEntryTitle}
                />

                {loadingPrompts ? (
                  <View>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                  </View>
                ) : (
                  suggestedPrompts.map((prompt, index) => (
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
                  ))
                )}
                {/* Save Entry for Use Prompts */}
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={savePromptEntry}
                >
                  <Text style={styles.continueButtonText}>Save Entry</Text>
                </TouchableOpacity>
              </ScrollView>
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

const PastEntries = ({ openViewJournalModal, journalEntries, loading }) => {
  if (loading) {
    return <LoadingFlower />;
  }

  if (!journalEntries.length) {
    return <Text style={styles.emptyText}>No journal entries yet.</Text>;
  }

  const recentEntries = journalEntries
    .filter((entry) => entry.journalDate)
    .sort((a, b) => new Date(b.journalDate) - new Date(a.journalDate))
    .slice(0, 4);

  return (
    <View style={styles.pastEntries}>
      <Text style={styles.pastEntriesTitle}>Recent Past Entries</Text>
      <View style={styles.entryContainer}>
        {recentEntries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={styles.entryButton}
            onPress={() => openViewJournalModal(entry)} // Pass the entry to the callback
          >
            <Text style={styles.entryText}>
              {entry.entryTitle || "Untitled Entry"}
            </Text>
            <Text style={styles.dateText}>
              {entry.journalDate || "No Date"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomePage;

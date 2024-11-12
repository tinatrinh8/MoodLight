import React, { useState, useEffect } from "react";
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
  ScrollView
} from "react-native";
import { onAuthStateChanged } from "firebase/auth"; // Firebase Auth listener
import { auth } from "../components/firebase"; // Import Firebase auth instance
import Header from "../components/Header";
import styles from "../styles/HomePageStyles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native"; // Import useRoute
import { addJournalEntry, getJournalEntries, handleSavePromptEntry } from "../functions/JournalFunctions";
import prompts from "../assets/prompts";

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
const navigation = useNavigation();
  const route = useRoute();
  const [viewJournalModalVisible, setViewJournalModalVisible] = useState(false);
  const [editJournalModalVisible, setEditJournalModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [user, setUser] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]); // Already defined here
  const [loading, setLoading] = useState(false);
  const [newEntryText, setNewEntryText] = useState(""); // For "Write Freely" modal
  const [createEntryModalVisible, setCreateEntryModalVisible] = useState(false); // Manage Add button modal visibility
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const entries = await getJournalEntries();
        setJournalEntries(entries);
      } catch (error) {
        console.error("Error fetching journal entries:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    if (route.params?.entry) {
      setSelectedEntry(route.params.entry);
      setViewJournalModalVisible(true);
    }

    fetchEntries();

    return () => {
      unsubscribeAuth();
    };
  }, [route.params]);

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
    { id: "title", component: <Title /> },
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
          navigation={navigation}
          newEntryText={newEntryText}
          setNewEntryText={setNewEntryText}
          modalVisible={createEntryModalVisible}
          setModalVisible={setCreateEntryModalVisible}
          setJournalEntries={setJournalEntries} // Pass the function here
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
  const [writeFreelyModalVisible, setWriteFreelyModalVisible] = useState(false);
  const [usePromptsModalVisible, setUsePromptsModalVisible] = useState(false);
  const [promptResponses, setPromptResponses] = useState(Array(5).fill(""));
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [promptEntryTitle, setPromptEntryTitle] = useState("");
  const [randomPrompts, setRandomPrompts] = useState([]); // State for random prompts

  const closeModal = () => {
    setModalVisible(false);
    setWriteFreelyModalVisible(false);
    setUsePromptsModalVisible(false);
  };

  const openPromptsModal = () => {
    // Generate 5 random prompts
    const shuffledPrompts = prompts.sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomPrompts(shuffledPrompts); // Store the random prompts in state
    setUsePromptsModalVisible(true);
  };

const savePromptEntry = async () => {
  try {
    // Ensure there's a title and at least one non-empty response
    if (promptEntryTitle.trim() && promptResponses.some((response) => response.trim())) {
      // Save only non-empty responses to Firebase
      const filteredResponses = promptResponses.filter((response) => response.trim());

      console.log("Saving Responses:", filteredResponses);

      // Save to Firebase (responses + title)
      await handleSavePromptEntry(filteredResponses, promptEntryTitle);

      // Reset states after saving
      setPromptResponses(Array(5).fill("")); // Reset responses to empty strings
      setPromptEntryTitle(""); // Clear the title input
      closeModal(); // Close the modal

      // Refresh journal entries
      const updatedEntries = await getJournalEntries();
      setJournalEntries(updatedEntries); // Update the list of entries
    } else {
      console.warn("Validation failed: Please provide a title and at least one response.");
    }
  } catch (error) {
    console.error("Error saving prompt entry:", error.message);
  }
};


  const handleSaveEntry = async () => {
    if (newEntryTitle.trim() && newEntryText.trim()) {
      try {
        await addJournalEntry(newEntryText, newEntryTitle);
        setNewEntryTitle(""); // Clear the title input
        setNewEntryText(""); // Clear the text input
        closeModal();

        const updatedEntries = await getJournalEntries();
        setJournalEntries(updatedEntries); // Update entries
      } catch (error) {
        console.error("Error saving journal entry:", error.message);
      }
    } else {
      alert("Please provide both a title and content before saving.");
    }
  };

  return (
    <View style={styles.createEntryContainer}>
      <Image source={require("../assets/cat.png")} style={styles.cat} />
      <Text style={styles.createEntryText}>
        Create a New{"\n"}Journal Entry
      </Text>
      <View style={styles.buttonAndCraneContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>How would you like to journal today?</Text>
            <TouchableOpacity style={styles.journalOption} onPress={() => setWriteFreelyModalVisible(true)}>
              <Text style={styles.optionTitle}>Write Freely</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.journalOption} onPress={openPromptsModal}>
              <Text style={styles.optionTitle}>Use Prompts</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            <TouchableOpacity style={styles.continueButton} onPress={handleSaveEntry}>
              <Text style={styles.continueButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

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
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Need a little inspiration?</Text>
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
                    placeholder={'Write your answer here...'}
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
            <TouchableOpacity style={styles.continueButton} onPress={savePromptEntry}>
              <Text style={styles.continueButtonText}>Save Entry</Text>
            </TouchableOpacity>
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

const PastEntries = ({ openViewJournalModal, journalEntries, loading }) => {
  if (loading) {
    return <Text style={styles.loadingText}>Loading entries...</Text>;
  }

  if (!journalEntries.length) {
    return <Text style={styles.emptyText}>No journal entries yet.</Text>;
  }

  const recentEntries = journalEntries
    .sort((a, b) => b.date.seconds - a.date.seconds) // Sort by date
    .slice(0, 4); // Limit to 4 entries

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
            <Text style={styles.entryText}>{entry.entryTitle || "Untitled Entry"}</Text>
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
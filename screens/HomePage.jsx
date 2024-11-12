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
import { addJournalEntry, getJournalEntries } from "../functions/JournalFunctions";


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
  const [journalEntries, setJournalEntries] = useState([]);
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
}) => {
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

  const handleSaveEntry = async () => {
    if (newEntryText.trim()) {
      try {
        await addJournalEntry(newEntryText);
        setNewEntryText("");
        setWriteFreelyModalVisible(false);
        const updatedEntries = await getJournalEntries();
        console.log("Updated Entries:", updatedEntries);
      } catch (error) {
        console.error("Error saving journal entry:", error.message);
      }
    } else {
      alert("Please write something before saving.");
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
            <TouchableOpacity style={styles.journalOption} onPress={openWriteFreelyModal}>
              <Text style={styles.optionTitle}>Write Freely</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.journalOption} onPress={openUsePromptsModal}>
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
              style={styles.textInputBox}
              placeholder="Write your thoughts here..."
              value={newEntryText}
              onChangeText={setNewEntryText}
            />
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleSaveEntry}
            >
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
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.modalTitle}>Need a little inspiration?</Text>
              <Text style={styles.modalSubtitle}>Please fill out at least 3 prompts.</Text>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <View key={index} style={styles.promptContainer}>
                  <Text style={styles.textBoxTitle}>{`Prompt ${index + 1}`}</Text>
                  <TextInput
                    style={styles.textInputBox}
                    placeholder={`Answer Prompt ${index + 1} here...`}
                    placeholderTextColor="#A9A9A9"
                    multiline={true}
                    textAlignVertical="top"
                  />
                </View>
              ))}
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

const PastEntries = ({ openViewJournalModal, journalEntries, loading }) => {
  if (loading) {
    return <Text style={styles.loadingText}>Loading entries...</Text>;
  }

  if (!journalEntries.length) {
    return <Text style={styles.emptyText}>No journal entries yet.</Text>;
  }

  // Sort by date and take the 4 most recent entries
  const recentEntries = journalEntries
    .sort((a, b) => b.date.seconds - a.date.seconds) // Sort by most recent date
    .slice(0, 4); // Limit to 4 most recent entries

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
            <Text style={styles.entryText}>{entry.entryText}</Text>
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

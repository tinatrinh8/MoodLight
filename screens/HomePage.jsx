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
  const navigation = useNavigation(); // Access navigation here
  const route = useRoute(); // Access route for receiving params
  const [viewJournalModalVisible, setViewJournalModalVisible] = useState(false);
  const [editJournalModalVisible, setEditJournalModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [user, setUser] = useState(null); // State to track the authenticated user
  const [journalEntries, setJournalEntries] = useState([]); // Stores fetched journal entries
  const [loading, setLoading] = useState(false); // Indicates loading state
  const [newEntryText, setNewEntryText] = useState(""); // For "Write Freely" modal


useEffect(() => {
  // Function to fetch journal entries
  const fetchEntries = async () => {
    try {
      setLoading(true); // Set loading state
      const entries = await getJournalEntries(); // Fetch entries from Firestore
      setJournalEntries(entries); // Update state with fetched entries
    } catch (error) {
      console.error("Error fetching journal entries:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Listen for authentication state changes
  const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // Update the user state
      setUser(currentUser);
    } else {
      setUser(null); // Clear user state if not logged in
    }
  });

  // Check for entry passed via route.params
  if (route.params?.entry) {
    setSelectedEntry(route.params.entry);
    setViewJournalModalVisible(true); // Open the modal if entry is passed
  }

  // Fetch entries when the component mounts
  fetchEntries();

  // Cleanup the listener on component unmount
  return () => {
    unsubscribeAuth(); // Unsubscribe from auth listener
  };
}, [route.params]);

  const openViewJournalModal = (entry) => {
    setSelectedEntry(entry);
    setViewJournalModalVisible(true);
  };

  const closeViewJournalModal = () => {
    setSelectedEntry(null);
    setViewJournalModalVisible(false);
  };

  const openEditJournalModal = () => {
      setEditedContent(selectedEntry.content || "");
      setEditJournalModalVisible(true);
      setViewJournalModalVisible(false);
  };

  const closeEditJournalModal = () => {
    setEditJournalModalVisible(false);
  };

  const saveEditedJournal = () => {
    if (selectedEntry) {
      // Logic to save the edited journal content
      selectedEntry.content = editedContent;
    }
    closeEditJournalModal();
  };

const contentData = [
  {
    id: "greeting",
    component: (
      <View style={styles.greetingContainer}>
        <View style={styles.greetingTextContainer}>
          <Text style={styles.greetingText}>
            Hello, {user?.displayName ? user.displayName.split(" ")[0] : "User"}
          </Text>
        </View>
        {/* Make Profile Circle Clickable */}
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigation.navigate("Settings")} // Navigate to Settings
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
    component: <PastEntries openViewJournalModal={openViewJournalModal} />,
  },
  { id: "createEntry", component: <CreateJournalEntry navigation={navigation} /> }, // Pass navigation
];


  return (
    <View style={styles.container}>
      <Header />
        <FlatList
          data={contentData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.id === "pastEntries" ? (
              <PastEntries
                openViewJournalModal={openViewJournalModal}
                journalEntries={journalEntries}
                loading={loading}
              />
            ) : (
              item.component
            )
          }
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />


    {/* View Journal Modal */}
    <Modal
      animationType="fade"
      transparent={true}
      visible={viewJournalModalVisible}
      onRequestClose={closeViewJournalModal}
    >
      <View style={[styles.modalContent, { flex: 1, justifyContent: 'flex-start', marginTop: 40 }]}>
        <TouchableOpacity onPress={closeViewJournalModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        {selectedEntry && (
          <>
            <Text style={styles.modalTitle}>{selectedEntry.title}</Text>
            <Text style={styles.journalSubtitle}>
              Date: {new Date().toLocaleDateString()}
            </Text>
            <TextInput
              style={styles.textInputBox}
              value={selectedEntry.content}
              editable={false}
              multiline={true}
              textAlignVertical="top"
            />
            {/* Edit Button */}
            <TouchableOpacity
              onPress={() => {}} // Placeholder for now
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Edit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>


        {/* Edit Journal Modal */}
             <Modal
               animationType="fade"
               transparent={true}
               visible={editJournalModalVisible}
               onRequestClose={closeEditJournalModal}
             >
               <KeyboardAvoidingView
                 style={styles.modalOverlay}
                 behavior={Platform.OS === "ios" ? "padding" : "height"}
               >
                 <View style={styles.modalContent}>
                   <TouchableOpacity onPress={closeEditJournalModal} style={styles.closeButton}>
                     <Text style={styles.closeButtonText}>×</Text>
                   </TouchableOpacity>
                   <Text style={styles.modalTitle}>Edit Your Entry</Text>
                   <TextInput
                     style={styles.textInputBox}
                     value={editedContent}
                     onChangeText={setEditedContent}
                     multiline={true}
                     textAlignVertical="top"
                     placeholder="Edit your journal entry here..."
                     placeholderTextColor="#A9A9A9"
                   />
                   <TouchableOpacity style={styles.continueButton} onPress={saveEditedJournal}>
                     <Text style={styles.continueButtonText}>Save Changes</Text>
                   </TouchableOpacity>
                 </View>
               </KeyboardAvoidingView>
             </Modal>


    </View>
  );
};

const CreateJournalEntry = ({ navigation }) => {
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
 {/* Use Prompts Modal */}
 <Modal
   animationType="fade"
   transparent={true}
   visible={usePromptsModalVisible} // Controlled by usePromptsModalVisible
   onRequestClose={closeModal} // Close all modals
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
         <Text style={styles.journalSubtitle}>Journal Title: dd/mm/yyyy</Text>

         {[1, 2, 3, 4, 5].map((_, index) => (
           <View key={index} style={styles.promptContainer}>
             {/* Display the placeholder for each prompt */}
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
             closeModal(); // Close all modals
             navigation.navigate("Analysis"); // Navigate to Analysis page
           }}
         >
           <Text style={styles.continueButtonText}>Save Entry</Text>
         </TouchableOpacity>
       </ScrollView>
     </View>
   </KeyboardAvoidingView>
 </Modal>
      {/* Write Freely Modal */}
<Modal
  animationType="fade"
  transparent={true}
  visible={writeFreelyModalVisible}
  onRequestClose={() => setWriteFreelyModalVisible(false)}
>
  <KeyboardAvoidingView
    style={styles.modalOverlay}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={() => setWriteFreelyModalVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Dear diary...</Text>
      <TextInput
        style={styles.textInputBox}
        placeholder="Write your thoughts here..."
        placeholderTextColor="#A9A9A9"
        value={newEntryText}
        onChangeText={setNewEntryText}
        multiline={true}
        textAlignVertical="top"
      />
      <TouchableOpacity
        style={styles.continueButton}
        onPress={async () => {
          if (newEntryText.trim()) {
            await addJournalEntry(newEntryText); // Save the entry
            setNewEntryText(""); // Clear input
            setWriteFreelyModalVisible(false); // Close modal
            const updatedEntries = await getJournalEntries(); // Refresh entries
            setJournalEntries(updatedEntries); // Update entries
          } else {
            alert("Please write something before saving.");
          }
        }}
      >
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
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.pastEntries}>
      <Text style={styles.pastEntriesTitle}>Past Entries</Text>
      <View style={styles.entryContainer}>
        {journalEntries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={[styles.entryButton, { backgroundColor: "#C21840" }]}
            onPress={() => openViewJournalModal(entry)}
          >
            <Text style={styles.entryText}>{entry.entryText}</Text>
            <Text style={styles.dateText}>
              {new Date(entry.date.seconds * 1000).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


export default HomePage;

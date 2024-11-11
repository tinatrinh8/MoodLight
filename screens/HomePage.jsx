import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import * as Font from "expo-font";
import Header from "../components/Header";
import styles from "../styles/HomePageStyles";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

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
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      LexendDeca: require("../assets/fonts/LexendDeca-VariableFont_wght.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
      {/* Static Header */}
      <Header />
      {/* Scrollable Content */}
      <FlatList
        data={contentData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.component}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} // Add this line
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const CreateJournalEntry = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [modalVisible, setModalVisible] = useState(false);
  const [showSecondModalContent, setShowSecondModalContent] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [writeFreelyVisible, setWriteFreelyVisible] = useState(false);
  const [usePromptsVisible, setUsePromptsVisible] = useState(false);
  const [writeFreelyModalVisible, setWriteFreelyModalVisible] = useState(false);
  const [usePromptsModalVisible, setUsePromptsModalVisible] = useState(false);

  // Ref for fade animation between modals
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const openModal = () => {
    setModalVisible(true);
    setShowSecondModalContent(false);
    setSelectedOption(null);
    fadeAnim.setValue(1); // Reset fade animation when modal opens
  };

  const slideToNextPage = () => {
    // Fade out first content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSecondModalContent(true); // After fade out, show the second content
      fadeAnim.setValue(0); // Reset fade animation to start from 0 for second content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(); // Fade in second content
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setShowSecondModalContent(false); // Reset to first content when closing
    setWriteFreelyVisible(false);
    setUsePromptsVisible(false);
    setWriteFreelyModalVisible(false);
    setUsePromptsModalVisible(false);
  };

  const handleJournalOption = (option) => {
    setSelectedOption(option);
    if (option === "Write Freely") {
      setWriteFreelyVisible(true);
      setUsePromptsVisible(false);
    } else if (option === "Use Prompts") {
      setUsePromptsVisible(true);
      setWriteFreelyVisible(false);
    }
  };

  const openWriteFreelyModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setWriteFreelyModalVisible(true);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const openUsePromptsModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setUsePromptsModalVisible(true);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.createEntryContainer}>
      <Image source={require("../assets/cat.png")} style={styles.cat} />
      <Text style={styles.createEntryText}>Create New Journal Entry</Text>

      <View style={styles.buttonAndCraneContainer}>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <Image source={require("../assets/crane.png")} style={styles.crane} />
      </View>

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

            {showSecondModalContent ? (
              selectedOption === "Write Freely" && writeFreelyVisible ? (
                // Modal Content for Write Freely
                <Animated.View
                  style={[styles.writeFreelyContainer, { opacity: fadeAnim }]}
                >
                  <Text style={styles.modalSelectTitle}>Write Freely</Text>
                  <TextInput
                    placeholder="Let your thoughts flow..."
                    style={styles.writeFreelyInput}
                    multiline
                  />
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => {
                      Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                      }).start(() => {
                        setWriteFreelyModalVisible(true);
                        fadeAnim.setValue(0);
                        Animated.timing(fadeAnim, {
                          toValue: 1,
                          duration: 300,
                          useNativeDriver: true,
                        }).start();
                      });
                    }}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                  </TouchableOpacity>
                </Animated.View>
              ) : selectedOption === "Use Prompts" && usePromptsVisible ? (
                // Modal Content for Use Prompts
                <Animated.View
                  style={[styles.usePromptsContainer, { opacity: fadeAnim }]}
                >
                  <Text style={styles.modalSelectTitle}>Use Prompts</Text>
                  <TextInput
                    placeholder="Describe your emotions..."
                    style={styles.promptInput}
                    multiline
                  />
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => {
                      Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                      }).start(() => {
                        setUsePromptsModalVisible(true);
                        fadeAnim.setValue(0);
                        Animated.timing(fadeAnim, {
                          toValue: 1,
                          duration: 300,
                          useNativeDriver: true,
                        }).start();
                      });
                    }}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                  </TouchableOpacity>
                </Animated.View>
              ) : null
            ) : (
              // First Modal Content
              <Animated.View
                style={[styles.firstModalContainer, { opacity: fadeAnim }]}
              >
                <Text style={styles.modalDateTitle}>Date of journal entry</Text>
                <View style={styles.modalDateWrapper}>
                  <Text style={styles.modalDate}> __/__/____ </Text>
                </View>

                <Text style={styles.modalJournalName}>
                  Give your journal entry a name!
                </Text>
                <TextInput
                  placeholder="Day in a Life of a Student"
                  style={styles.journalName}
                  multiline
                />

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={slideToNextPage}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {showSecondModalContent &&
              !writeFreelyVisible &&
              !usePromptsVisible && (
                <View style={styles.journalOptionsContainer}>
                  <Text style={styles.modalSelectTitle}>
                    How would you like to journal today?
                  </Text>
                  <Text style={styles.modalSelectTitleDescription}>
                    Choose how you would like to write
                  </Text>
                  {journalOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.journalOption}
                      onPress={() => {
                        Animated.timing(fadeAnim, {
                          toValue: 0,
                          duration: 300,
                          useNativeDriver: true,
                        }).start(() => {
                          handleJournalOption(option.title);
                          fadeAnim.setValue(0);
                          Animated.timing(fadeAnim, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: true,
                          }).start();
                        });
                      }}
                    >
                      <View>
                        <Text style={styles.optionTitle}>{option.title}</Text>
                        <Text style={styles.optionDescription}>
                          {option.selectDescription}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal for Write Freely */}
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
            <Text style={styles.modalSelectTitle}>Write Freely</Text>
            <TextInput
              placeholder="Let your thoughts flow..."
              style={styles.writeFreelyInput}
              multiline
            />
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => {
                closeModal(); // Close modal
                console.log("Navigating to Analysis");
                navigation.navigate("Analysis"); // Navigate to Analysis screen
              }}
            >
              <Text style={styles.continueButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal for Use Prompts */}
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
            <Text style={styles.modalSelectTitle}>Use Prompts</Text>
            <TextInput
              placeholder="Describe your emotions..."
              style={styles.promptInput}
              multiline
            />
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => {
                closeModal(); // Close modal
                console.log("Navigating to Analysis");
                navigation.navigate("Analysis"); // Navigate to Analysis screen
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

// Search Bar Component
function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#555"
      />
      <TouchableOpacity>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

// Title Component
function Title() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Let’s Start Journaling</Text>
      <Text style={styles.subtitle}>Shall we?</Text>
      <Image source={require("../assets/shelf.png")} style={styles.shelf} />
      <Text style={styles.quote}>“Quote of the day”</Text>
    </View>
  );
}

// Past Entries Component
const entryData = [
  { id: 1, title: "Yesterday", color: "#C21840" },
  { id: 2, title: "2 Days Ago", color: "#6FBCAE" },
  { id: 3, title: "3 Days Ago", color: "#787392" },
  { id: 4, title: "View All", color: "#4B4B4B" },
];

function PastEntries() {
  return (
    <View style={styles.pastEntries}>
      <Text style={styles.pastEntriesTitle}>Past Entries</Text>
      <View style={styles.entryContainer}>
        {entryData.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={[styles.entryButton, { backgroundColor: entry.color }]}
          >
            <Text style={styles.entryText}>{entry.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default HomePage;

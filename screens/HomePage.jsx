import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import * as Font from "expo-font";
import Header from "../components/Header";

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
    { id: "header", component: <Header style={{ marginBottom: 0 }} /> },
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
    <FlatList
      data={contentData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => item.component}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
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

function CreateJournalEntry() {
  return (
    <View style={styles.createEntryContainer}>
      <Image
        source={require("../assets/cat.png")} // Replace with your actual image path
        style={styles.cat}
      />
      <Text style={styles.createEntryText}>Create New Journal Entry</Text>
      
      {/* Container for Add button and crane image */}
      <View style={styles.buttonAndCraneContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <Image
          source={require("../assets/crane.png")}
          style={styles.crane} // Style for the crane image
        />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F0E8",
    padding: 20,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  greetingTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 10, // Space between text and profile picture
  },
  greetingText: {
    fontSize: 20,
    color: "#1D3557",
    fontFamily: "LexendDeca",
    fontWeight: "bold",
  },
  greetingSubtitleText: {
    fontSize: 15,
    color: "#1D3557",
    fontFamily: "LexendDeca",
    transform: [{ skewX: "-10deg" }],
    marginTop: 4, // Space between greeting text and subtitle
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 45,
    backgroundColor: "rgba(220, 134, 154, 0.5)", // Light pink background
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000", // Black border
  },
  profileText: {
    fontSize: 30,
    color: "#000000", // Black color for the avatar initial
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    fontSize: 18,
    color: "#999",
    padding: 10,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D3557",
    textAlign: "center",
    fontFamily: "LexendDeca",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#1D3557",
    marginBottom: 10,
  },
  shelf: {
    width: 200,
    height: 150,
    resizeMode: "contain",
    marginVertical: 10,
  },
  quote: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#A8DADC",
    textAlign: "center",
  },
  pastEntries: {
    marginTop: 20,
  },
  pastEntriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D3557",
    marginBottom: 10,
    fontFamily: "LexendDeca",
  },
  entryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 60,
    marginTop:20,
  },

  entryButton: {
    width: "48%",
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.75,
    shadowRadius: 6,
    elevation: 10,
  },

  entryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
  },

  cat: {
    position: "absolute",
    top: -110,
    left: 10,
    width: 200,
    height: 200,
    zIndex: 4,
    resizeMode: "contain",
  },

  createEntryContainer: {
    marginTop: 40,
    width: "100%",
    backgroundColor: "#FFCA6E",
    borderRadius: 15,
    paddingVertical: 10, // Reduced padding to make it shorter
    marginBottom: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.99,
    shadowRadius: 6,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },

createEntryText: {
  fontSize: 40,
  fontWeight: "bold",
  color: "#FFF",
  textAlign: "Left",
  fontFamily: "LexendDeca",

},
  
// New style for container holding the button and crane image
buttonAndCraneContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "75%", // Adjust as needed
  marginTop: 10, // Adjust spacing from text above if necessary
},

addButton: {
  backgroundColor: "#F8C100",
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 50,
  marginRight: 10, // Space between the button and crane
  alignItems: "center",
},

addButtonText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#FFF",
  textAlign: "center",
  fontFamily: "LexendDeca",
},

crane: {
  width: 130, // Adjust size as needed
  height: 130,
  resizeMode: "contain",
},
});

export default HomePage;
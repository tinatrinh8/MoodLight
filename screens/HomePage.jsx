import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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

  return (
    <View style={styles.container}>

      <Header />
      <SearchBar />
      <Title />
      <PastEntries />
      <CreateJournalEntry />
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
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/53f4d86488d291fae0ac02f2cfe50938636f32544d2382786326135790cb8f9c?placeholderIfAbsent=true&apiKey=9b7049a43e3e43878b092197a2e985ba",
        }}
        style={styles.image}
      />
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

// Create Journal Entry Component
function CreateJournalEntry() {
  return (
    <View style={styles.createEntryContainer}>
      <Text style={styles.createEntryText}>Create a New Journal Entry</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    padding: 20,
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
  image: {
    width: 150,
    height: 100,
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
  createEntryContainer: {
    width: "100%",
    backgroundColor: "#FFCA6E",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.75,
    shadowRadius: 6,
    elevation: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  createEntryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "LexendDeca",
  },
  addButton: {
    backgroundColor: "#F8C100",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    fontFamily: "LexendDeca",
  },
});

export default HomePage;

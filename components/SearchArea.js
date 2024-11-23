import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/HomePageStyles";
import { getJournalEntries } from "../functions/JournalFunctions";

export const SearchArea = ({ handleOpenJournal }) => {
  const [searchTerm, setSearchTerm] = useState(null);

  return (
    <SafeAreaView style={styles.searchContainer}>
      <SearchBar onSearch={setSearchTerm} />
      <SearchResults
        searchTerm={searchTerm}
        handleOpenJournal={handleOpenJournal}
      />
    </SafeAreaView>
  );
};

const SearchResults = ({ searchTerm, handleOpenJournal }) => {
  const [allEntries, setAllEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!searchTerm || searchTerm.trim().length === 0) {
      setAllEntries([]);
      setIsLoading(false);
      return;
    }

    getJournalEntries()
      .then((res) => {
        const filteredResults = res.filter((item) =>
          item.entryTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setAllEntries(filteredResults);
      })
      .catch((error) => console.error("Error fetching journal entries:", error))
      .finally(() => setIsLoading(false));
  }, [searchTerm]);

  return (
    <View style={styles.resultsContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#666" />
      ) : searchTerm && allEntries.length === 0 ? (
        <Text style={styles.noResultsText}>No Search Results.</Text>
      ) : (
        <FlatList
          data={allEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleOpenJournal(item)}
            >
              <Text style={styles.resultText}>{item.entryTitle}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(onSearch, 500);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Past Entries..."
        placeholderTextColor="#aaa"
        value={searchValue}
        onChangeText={handleSearchChange}
      />
      {searchValue ? (
        <TouchableOpacity onPress={() => handleSearchChange("")}>
          <Text style={styles.clearButton}>×</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

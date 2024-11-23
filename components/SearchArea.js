import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView, Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity
} from "react-native";
import styles from "../styles/HomePageStyles";
import {
    getJournalEntries
} from "../functions/JournalFunctions";

export const SearchArea = ({ handleOpenJournal }) => {

    const [searchTerm, setSearchTerm] = useState(null)


    return (
        <>
            <SafeAreaView style={styles.searchBar}>
                <SearchBar onSearch={setSearchTerm} />
                <SearchResults searchTerm={searchTerm} handleOpenJournal={handleOpenJournal} />
            </SafeAreaView>
        </>
    );

}

const SearchResults = ({ searchTerm }) => {

    const [allEntries, setAllEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (searchTerm === null || searchTerm.length < 1) {
            setAllEntries([])
        } else {
            getJournalEntries().then(res => {
                setAllEntries(filterEntries(searchTerm, res))
            })
                .finally(() => {
                    setIsLoading(false)
                });
        }

    }, [searchTerm]);

    function filterEntries(search, entries) {
        return entries.filter((item) => item.entryTitle.toLowerCase().includes(search.toLowerCase()));
    }

    // do a query
    return (searchTerm !== null && searchTerm.length > 0 && allEntries.length < 1) ? (
        <Text>No Search Results.</Text>
    ) : (
        <FlatList
            data={allEntries}
            keyExtractor={(item) => item.entryTitle}
            renderItem={({ item }) => (
                <View>
                    <Text onPress={() => handleOpenJournal(item)}>{item.entryTitle} </Text>
                </View>
            )}
            refreshing={isLoading}
        >
        </FlatList>
    )


}
const SearchBar = ({ onSearch }) => {

    const [searchValue, setSearchValue] = useState('')

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
        setSearchValue(value)
        debouncedSearch(value);
    }

    return (
        <SafeAreaView style={{ flexDirection: 'row' }}>
            <TextInput
                style={{ // should probably move this for reusability later
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    bordeColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 8,
                    flexGrow: 1
                }}
                placeholder="Search Past Entries?"
                placeholderTextColor="#555"
                clearButtonMode='always'
                autoCapitalize='none'
                autoCorrect={false}
                value={searchValue}
                onChangeText={(query) => handleSearchChange(query)}
            />
            <TouchableOpacity>
                <Text style={styles.closeButton} onPress={() => handleSearchChange("")}>×</Text>
            </TouchableOpacity>
        </SafeAreaView >
    )

}

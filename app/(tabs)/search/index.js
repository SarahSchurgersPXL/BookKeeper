import { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { searchBooks } from '../../../utils/api';
import BookCard from '../../../components/BookCard';
import CustomButton from '../../../components/CustomButton';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Dropdown states for language
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState('');
  const [languageItems, setLanguageItems] = useState([
    { label: 'All Languages', value: '' },
    { label: 'English', value: 'eng' },
    { label: 'Dutch', value: 'dut' },
    { label: 'French', value: 'fre' },
  ]);

  // Dropdown states for medium
  const [mediumOpen, setMediumOpen] = useState(false);
  const [medium, setMedium] = useState('');
  const [mediumItems, setMediumItems] = useState([
    { label: 'All Mediums', value: '' },
    { label: 'Ebook', value: 'ebook' },
  ]);

  const handleSearch = async () => {
    const books = await searchBooks(query, { language, medium });
    setResults(books);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for books..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        onSubmitEditing={handleSearch}
      />
      <CustomButton title="Search" onPress={handleSearch} style={{ marginBottom: 10 }} />
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.key + index}
        renderItem={({ item }) => <BookCard book={item} />}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5271ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  dropdown: {
    marginBottom: 15,
    borderColor: '#ccc',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  list: {
    marginTop: 10,
  },
  separator: {
    height: 2,
    backgroundColor: '#5271ff',
    marginVertical: 5,
  },
});
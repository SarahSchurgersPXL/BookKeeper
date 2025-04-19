import { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { Provider } from 'react-native-paper';
import { searchBooks } from '../../../utils/api';
import BookCard from '../../../components/BookCard';
import CustomButton from '../../../components/CustomButton';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // New state to track if a search has occurred

  const handleSearch = async () => {
    setIsLoading(true);
    setPage(0);
    setHasSearched(true); // Mark that a search has been performed
    const books = await searchBooks(query, {}, 0);
    setResults(books);
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    if (isLoading) return;
    const nextPage = page + 1;
    setIsLoading(true);
    const moreBooks = await searchBooks(query, {}, nextPage);
    setResults(prev => [...prev, ...moreBooks]);
    setPage(nextPage);
    setIsLoading(false);
  };

  return (
    <Provider>
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
          keyExtractor={(item, index) => `${item.key || item.id || 'book'}-${index}`}
          renderItem={({ item }) => <BookCard book={item} />}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            hasSearched && results.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>
            ) : null
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#ffffff',
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
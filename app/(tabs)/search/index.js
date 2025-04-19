import { useState } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import { searchBooks } from '../../../utils/api';
import BookCard from '../../../components/BookCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const books = await searchBooks(query);
    setResults(books);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search for books..."
        value={query}
        onChangeText={setQuery}
        style={{ padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 }}
      />
      <Button title="Zoeken" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.key + index}
        renderItem={({ item }) => <BookCard book={item} />}
      />
    </View>
  );
}
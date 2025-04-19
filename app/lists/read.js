import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getBooksFromList } from '../../utils/storage';
import BookCard from '../../components/BookCard';

export default function ToReadScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getBooksFromList('read');
      setBooks(data);
    };
    const unsubscribe = load();
    return () => unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>To Read</Text>
      <FlatList
        data={books}
        keyExtractor={(item, index) => item.key + index}
        renderItem={({ item }) => <BookCard book={item} />}
      />
    </View>
  );
}
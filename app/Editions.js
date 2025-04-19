import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from 'react';
import { addBookToList } from '../utils/storage';
import CustomButton from '../components/CustomButton';

export default function EditionsScreen() {
  const { book } = useLocalSearchParams();
  const router = useRouter();
  const bookData = book ? JSON.parse(book) : null;
  const [editions, setEditions] = useState([]);
  const [filteredEditions, setFilteredEditions] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [languageFilter, setLanguageFilter] = useState(null);
  const [languageOptions, setLanguageOptions] = useState([
    { label: 'English', value: 'eng' },
    { label: 'Dutch', value: 'dut' },
    { label: 'French', value: 'fre' },
    { label: 'German', value: 'ger' },
    { label: 'Spanish', value: 'spa' },
  ]);

  const fetchAndFilter = async () => {
    if (!bookData?.id || !languageFilter) return;
    try {
      setLoading(true);
      const response = await fetch(`https://openlibrary.org${bookData.id}/editions.json`);
      const data = await response.json();
      const allEditions = data.entries || [];

      const enriched = await Promise.all(
        allEditions.map(async (ed) => {
          const isbn = ed.isbn_13?.[0] || ed.isbn_10?.[0];
          if (!isbn) return ed;
          try {
            const googleRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            const googleData = await googleRes.json();
            const volume = googleData.items?.[0]?.volumeInfo;
            return {
              ...ed,
              googlePages: volume?.pageCount,
              googleImage: volume?.imageLinks?.thumbnail,
              googlePrintType: volume?.printType,
            };
          } catch {
            return ed;
          }
        })
      );

      setEditions(enriched);
      const filtered = enriched.filter((ed) =>
        ed.languages?.some(lang => lang.key.includes(languageFilter))
      );
      setFilteredEditions(filtered);
      setHasFetched(true);
    } catch (error) {
      console.error('Failed to fetch editions:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderEdition = ({ item }) => {
    const title = item.title || 'Untitled';
    const author = bookData?.author_name?.join(', ') || 'Unknown Author';
    const language = item.languages?.map(l => l.key.replace('/languages/', '')).join(', ') || 'Unknown';
    const pages = item.googlePages || item.number_of_pages || item.pagination || 'N/A';
    const printType = item.googlePrintType || 'Unknown';
    const isbn = item.isbn_13?.[0] || item.isbn_10?.[0] || 'N/A';
    const fallbackCover = bookData?.coverUrl || 'https://via.placeholder.com/100x150?text=No+Cover';
    const cover = item.googleImage || (item.covers?.[0] ? `https://covers.openlibrary.org/b/id/${item.covers[0]}-M.jpg` : fallbackCover);

    return (
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: cover }} style={styles.cover} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>by {author}</Text>
          <Text style={styles.meta}>Pages: {pages}</Text>
          <Text style={styles.meta}>Language: {language}</Text>
          <Text style={styles.meta}>ISBN: {isbn}</Text>
          <CustomButton
            title="Add to List"
            onPress={() => {
              setSelectedEdition(item);
              setModalVisible(true);
            }}
            style={{ marginTop: 8 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleAddToList = (list) => {
    addBookToList(list, selectedEdition);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={languageFilter}
        items={languageOptions}
        setOpen={setOpen}
        setValue={setLanguageFilter}
        setItems={setLanguageOptions}
        placeholder="Select a language"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <TouchableOpacity onPress={fetchAndFilter} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search Editions</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#5271ff" style={{ marginVertical: 20 }} />}

      {hasFetched && !loading && (
        <FlatList
          data={filteredEditions}
          keyExtractor={(item, index) => item.key + index}
          renderItem={renderEdition}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No editions found for selected language.</Text>}
        />
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add to:</Text>
            <CustomButton title="To Read" onPress={() => handleAddToList('toread')} width="100%" />
            <CustomButton title="Reading" onPress={() => handleAddToList('reading')} width="100%" />
            <CustomButton title="Read" onPress={() => handleAddToList('read')} width="100%" />
            <CustomButton title="Cancel" onPress={() => setModalVisible(false)} width="100%" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  dropdown: {
    marginBottom: 10,
    borderColor: '#ccc',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  searchButton: {
    backgroundColor: '#5271ff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  cover: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  author: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    marginBottom: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 300,
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    color: '#5271ff',
  },
});

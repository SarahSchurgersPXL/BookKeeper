import { useState } from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { addBookToList } from '../utils/storage';
import CustomButton from './CustomButton';

export default function BookCard({ book }) {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { title, author_name, coverUrl } = book;

  const handleAddToList = (list) => {
    addBookToList(list, book);
    setModalVisible(false);
  };

  return (
    <View style={styles.card}>
      {/* Afbeelding links */}
      <TouchableOpacity onPress={() => router.push({ pathname: '/BookDetail', params: { book: JSON.stringify(book) } })}>
        <Image source={{ uri: coverUrl }} style={styles.image} />
      </TouchableOpacity>

      {/* Informatie en knop in een kolom */}
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/BookDetail', params: { book: JSON.stringify(book) } })}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author_name?.join(', ')}</Text>
        </TouchableOpacity>
        <CustomButton
          title="Add to List"
          onPress={() => setModalVisible(true)}
          style={styles.button}
        />
      </View>

      {/* Modal voor opties */}
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
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    // Verwijder de schaduw
    shadowColor: 'transparent', // iOS
    shadowOpacity: 0, // iOS
    shadowOffset: { height: 0, width: 0 }, // iOS
    shadowRadius: 0, // iOS
    elevation: 0, // Android
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5271ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
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
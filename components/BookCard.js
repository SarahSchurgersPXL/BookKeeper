import { useState } from 'react';
import { View, Text, Button, Image, Modal, TouchableOpacity } from 'react-native';
import { addBookToList } from '../utils/storage';

export default function BookCard({ book }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { title, author_name, cover_i } = book;
  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : 'https://via.placeholder.com/100x150?text=No+Cover';

  const handleAddToList = (list) => {
    addBookToList(list, book);
    setModalVisible(false);
  };

  return (
    <View style={{ padding: 10, borderBottomWidth: 1, flexDirection: 'row' }}>
      {/* Image on the left */}
      <Image source={{ uri: coverUrl }} style={{ width: 100, height: 150, marginRight: 10 }} />
      
      {/* Info on the right */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{title}</Text>
        <Text style={{ marginBottom: 10 }}>{author_name?.join(', ')}</Text>
        <Button title="Add to List" onPress={() => setModalVisible(true)} />

        {/* Modal for options */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Add to:</Text>
              <TouchableOpacity onPress={() => handleAddToList('toread')} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 16 }}>To Read</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddToList('reading')} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 16 }}>Reading</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddToList('read')} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 16 }}>Read</Text>
              </TouchableOpacity>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
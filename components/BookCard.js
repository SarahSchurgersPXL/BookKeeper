import { useState } from 'react';
import { View, Text, Image, Modal, StyleSheet } from 'react-native';
import { addBookToList } from '../utils/storage';
import CustomButton from './CustomButton';

export default function BookCard({ book }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { title, author_name, coverUrl } = book;

  const handleAddToList = (list) => {
    addBookToList(list, book);
    setModalVisible(false);
  };

  return (
    <View style={{ padding: 10, flexDirection: 'row' }}>
      {/* Image on the left */}
      <Image source={{ uri: coverUrl }} style={{ width: 100, height: 150, marginRight: 10 }} />

      {/* Info on the right */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{title}</Text>
        <Text style={{ marginBottom: 10 }}>{author_name?.join(', ')}</Text>
        <CustomButton
          title="Add to List"
          onPress={() => setModalVisible(true)}
          style={{ width: "70%" }}
        />

        {/* Modal for options */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300, height: 300 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20, color: '#5271ff' }}>Add to:</Text>
              <CustomButton title="To Read" onPress={() => handleAddToList('toread')} width="100%"/>
              <CustomButton title="Reading" onPress={() => handleAddToList('reading')} width="100%"/>
              <CustomButton title="Read" onPress={() => handleAddToList('read')} width="100%"/>
              <CustomButton title="Cancel" onPress={() => setModalVisible(false)} width="100%" />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5271ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '75%',
  },
});
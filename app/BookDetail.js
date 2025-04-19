import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BookDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const book = params.book ? JSON.parse(params.book) : null;

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Book details not found.</Text>
      </View>
    );
  }

  const { title, author_name, coverUrl, publish_year } = book;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: coverUrl }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author_name?.join(', ')}</Text>
        <Text style={styles.year}>Year: {publish_year?.[0]}</Text>

        <TouchableOpacity
          style={styles.editionsButton}
          onPress={() => router.push({ pathname: '/Editions', params: { book: JSON.stringify(book) } })}
        >
          <Text style={styles.editionsButtonText}>View All Editions</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.tabButton} onTouchEnd={() => router.push('/(tabs)')}>
          <Ionicons name="home-outline" size={24} color="#ffffff" />
          <Text style={styles.tabLabel}>Home</Text>
        </View>
        <View style={styles.tabButton} onTouchEnd={() => router.push('/(tabs)/search')}>
          <Ionicons name="search" size={24} color="#ffffff" />
          <Text style={styles.tabLabel}>Search</Text>
        </View>
        <View style={styles.tabButton} onTouchEnd={() => router.push('/(tabs)/profile')}>
          <Ionicons name="person-outline" size={24} color="#ffffff" />
          <Text style={styles.tabLabel}>Profile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
  },
  year: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  edition: {
    fontSize: 14,
    marginBottom: 5,
  },
  editionsButton: {
    marginTop: 20,
    backgroundColor: '#5271ff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  editionsButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5271ff',
    height: 60,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#5271ff',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 2,
  },
});
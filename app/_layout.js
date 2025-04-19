import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="lists/toread" />
      <Stack.Screen name="lists/reading" />
      <Stack.Screen name="lists/read" />
      <Stack.Screen 
        name="BookDetail" 
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="book" size={24} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff' }}>
                Book Details
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#5271ff', // Set the header background color
            borderBottomWidth: 2, // Explicitly set the bottom border width
            borderBottomColor: '#5271ff', // Explicitly set the bottom border color
            shadowColor: 'transparent', // Remove shadow color on iOS
            shadowOpacity: 0, // Ensure shadow opacity is 0 on iOS
            shadowOffset: { height: 0, width: 0 }, // Remove shadow offset on iOS
            shadowRadius: 0, // Remove shadow radius on iOS
            elevation: 0, // Remove shadow on Android
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ffffff', // Set the title color
          },
          headerTintColor: '#ffffff', // Set the back button color
        }}
      />
      <Stack.Screen 
        name="Editions" 
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="book" size={24} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff' }}>
                Editions
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#5271ff', // Set the header background color
            borderBottomWidth: 2, // Explicitly set the bottom border width
            borderBottomColor: '#5271ff', // Explicitly set the bottom border color
            shadowColor: 'transparent', // Remove shadow color on iOS
            shadowOpacity: 0, // Ensure shadow opacity is 0 on iOS
            shadowOffset: { height: 0, width: 0 }, // Remove shadow offset on iOS
            shadowRadius: 0, // Remove shadow radius on iOS
            elevation: 0, // Remove shadow on Android
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ffffff', // Set the title color
          },
          headerTintColor: '#ffffff', // Set the back button color
        }}
      />
    </Stack>
  );
}
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// blauw: #5271ff
// geel: #ffbd59
// oranje: #ff914d
// wit: #ffffff

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          shadowColor: 'transparent',
          borderBottomWidth: 2,
          borderBottomColor: '#5271ff',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#ffffff',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#5271ff',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="book" size={24} color="#5271ff" style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#5271ff' }}>
                The Book Keeper
              </Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#ffffff',
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="search" size={24} color="#5271ff" style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#5271ff' }}>
                Search for Books
              </Text>
            </View>
          ),          
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book-sharp' : 'book-outline'} color={color} size={24} />
          ),
          tabBarLabel: 'Search',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#ffffff',
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="person" size={24} color="#5271ff" style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#5271ff' }}>
                Profile
              </Text>
            </View>
          ),    
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
          ),
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#ffffff',
          },
        }}
      />
    </Tabs>
  );
}

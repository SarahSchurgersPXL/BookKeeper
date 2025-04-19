import { View, Text, Button } from 'react-native';
import { useNavigation } from 'expo-router';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>      
      <Button
        title="To Read"
        onPress={() => navigation.navigate('lists/toread')}
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Reading"
        onPress={() => navigation.navigate('lists/reading')}
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Read"
        onPress={() => navigation.navigate('lists/read')}
      />
    </View>
  );
}
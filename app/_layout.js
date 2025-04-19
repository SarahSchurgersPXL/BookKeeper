import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="lists/toread" />
      <Stack.Screen name="lists/reading" />
      <Stack.Screen name="lists/read" />
    </Stack>
  )
}
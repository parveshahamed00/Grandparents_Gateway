// app/layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from "./AuthContext";

export default function RootLayout() {
  return (
        <AuthProvider>
    
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="start" options={{ headerShown: false }} />
      
      {/* Tabs Layout included here */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </AuthProvider>
  );
}

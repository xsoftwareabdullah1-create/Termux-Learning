import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a0a' },
          headerTintColor: '#0f0',
          headerTitleStyle: { fontFamily: 'monospace' },
          contentStyle: { backgroundColor: '#0a0a0a' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Termux Learn' }} />
        <Stack.Screen name="lesson/[id]" options={{ title: 'Lesson' }} />
      </Stack>
    </>
  );
}

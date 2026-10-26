import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'completed_lessons';

export async function getCompleted(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function markCompleted(id: string) {
  try {
    const done = await getCompleted();
    if (!done.includes(id)) {
      done.push(id);
      await AsyncStorage.setItem(KEY, JSON.stringify(done));
    }
  } catch {
    // ignore write errors
  }
}

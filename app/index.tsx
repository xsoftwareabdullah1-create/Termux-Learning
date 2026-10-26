import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { lessons } from '../data/lessons';
import { getCompleted } from '../lib/progress';

export default function Home() {
  const [done, setDone] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCompleted().then(setDone);
    }, [])
  );

  const progress = done.length;
  const total = lessons.length;
  const pct = total ? Math.round((progress / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Master the terminal, one command at a time.
      </Text>

      <View style={styles.progressBox}>
        <Text style={styles.progressText}>
          Progress: {progress}/{total} ({pct}%)
        </Text>
      </View>

      <FlatList
        data={lessons}
        keyExtractor={(l) => l.id}
        renderItem={({ item }) => {
          const completed = done.includes(item.id);
          return (
            <Link href={`/lesson/${item.id}`} asChild>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.cardTitle}>
                  {completed ? '✅ ' : '⬜ '} {item.title}
                </Text>
                <Text style={styles.badge}>{item.level}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </TouchableOpacity>
            </Link>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 16, paddingTop: 20 },
  subtitle: { color: '#888', marginBottom: 12, fontFamily: 'monospace' },
  progressBox: {
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0f0',
  },
  progressText: { color: '#0f0', fontFamily: 'monospace', fontSize: 13 },
  card: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardTitle: { color: '#fff', fontSize: 16, fontFamily: 'monospace' },
  badge: { color: '#0f0', fontSize: 11, marginTop: 4, fontFamily: 'monospace' },
  desc: { color: '#999', fontSize: 12, marginTop: 6, fontFamily: 'monospace' },
});

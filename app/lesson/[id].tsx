import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { lessons } from '../../data/lessons';
import Terminal from '../../components/Terminal';
import { markCompleted } from '../../lib/progress';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', padding: 40, fontFamily: 'monospace' }}>
          Lesson not found.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.header}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.level}>{lesson.level}</Text>
        <Text style={styles.desc}>{lesson.description}</Text>
        {lesson.commands.map((c, i) => (
          <Text key={i} style={styles.expl}>
            • {c.explanation}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.terminalWrap}>
        <Terminal
          commands={lesson.commands}
          onAllComplete={() => markCompleted(lesson.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingHorizontal: 16, paddingTop: 12, maxHeight: 220 },
  title: { color: '#0f0', fontSize: 20, fontFamily: 'monospace', marginBottom: 4 },
  level: { color: '#0f0', fontSize: 11, fontFamily: 'monospace', marginBottom: 8 },
  desc: { color: '#aaa', fontFamily: 'monospace', fontSize: 13, marginBottom: 8 },
  expl: { color: '#888', fontFamily: 'monospace', fontSize: 12, marginBottom: 4 },
  terminalWrap: { flex: 1, marginTop: 8, borderTopWidth: 1, borderTopColor: '#222' },
});

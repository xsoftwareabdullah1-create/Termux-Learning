import React, { useState, useRef } from 'react';
import { View, TextInput, Text, ScrollView, StyleSheet } from 'react-native';
import type { Command } from '../data/lessons';

type Props = {
  commands: Command[];
  onAllComplete: () => void;
};

export default function Terminal({ commands, onAllComplete }: Props) {
  const [history, setHistory] = useState<string[]>([
    'Termux Learn — simulated terminal',
    'Type the command shown in the lesson and press Enter.',
    '',
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const current = commands[step];

  const handleSubmit = () => {
    const cmd = input.trim();
    if (!cmd) return;

    const lines = [`$ ${cmd}`];

    if (current && cmd === current.command) {
      if (current.output) lines.push(current.output);
      lines.push('✅ Correct!');
      const next = step + 1;
      setStep(next);

      if (next >= commands.length) {
        lines.push('🎉 Lesson complete!');
        onAllComplete();
      } else {
        lines.push(`Next: ${commands[next].explanation}`);
      }
    } else {
      lines.push(`❌ ${current?.hint ?? 'Try again.'}`);
    }

    setHistory((h) => [...h, ...lines]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <View style={styles.wrap}>
      <ScrollView ref={scrollRef} style={styles.output}>
        {history.map((line, i) => (
          <Text key={i} style={styles.line}>
            {line}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <Text style={styles.prompt}>$</Text>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSubmit}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="type a command..."
          placeholderTextColor="#555"
          returnKeyType="send"
          blurOnSubmit={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#000' },
  output: { flex: 1, padding: 12 },
  line: { color: '#0f0', fontFamily: 'monospace', fontSize: 13, marginBottom: 2 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  prompt: { color: '#0f0', fontFamily: 'monospace', marginRight: 6 },
  input: { flex: 1, color: '#0f0', fontFamily: 'monospace', fontSize: 13, padding: 4 },
});

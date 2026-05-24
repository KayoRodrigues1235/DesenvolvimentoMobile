import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';

export default function PedidosScreen() {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Pedidos</ThemedText>
        <ThemedText style={styles.placeholder}>
          Lista de pedidos em desenvolvimento...
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  placeholder: {
    marginTop: Spacing.xl,
    textAlign: 'center',
  },
});
import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Home() {
  const { theme } = useTheme();

  return (
    <AppLayout title="Início" activeScreen="Home">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        // se o AppLayout já dá flex:1, não precisa aqui
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: theme.colors.primary,
            marginBottom: 12,
          }}
        >
          Bem-vindo!
        </Text>

        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Text style={{ color: theme.colors.text }}>
            Conteúdo da Home…
          </Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

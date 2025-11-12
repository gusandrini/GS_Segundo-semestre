// Splash.tsx
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { styles } from '@/styles/screens/Splash';

export default function Splash() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const logo = require('@/assets/NEXO.png');
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        {/* Bloco central (logo + mensagens) */}
        <View style={styles.centerBlock}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
            accessible
            accessibilityLabel="Logo NEXO"
          />

          <Text style={[styles.headline, { color: theme.colors.text }]}>
            Planeje sua próxima virada de carreira com IA
          </Text>

          <Text style={[styles.subtext, { color: theme.colors.mutedText }]}>
            Analise seu perfil, descubra áreas em alta e receba trilhas rápidas de{' '}
            <Text style={{ fontWeight: '700' }}>reskilling</Text> e certificações.
          </Text>
        </View>

        {/* Ações (fixadas próximas ao rodapé) */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: theme.colors.primary }]}
            activeOpacity={0.9}
            onPress={() => (navigation as any).navigate('Login')}
            accessibilityRole="button"
            accessibilityLabel="Entrar"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.primaryBtnText, { color: theme.colors.primaryText }]}>
              Começar agora
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: theme.colors.primary }]}
            activeOpacity={0.85}
            onPress={() => (navigation as any).navigate('Cadastro')}
            accessibilityRole="button"
            accessibilityLabel="Criar conta"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.secondaryBtnText, { color: theme.colors.primary }]}>
              Criar conta
            </Text>
          </TouchableOpacity>

          <Text style={[styles.version, { color: theme.colors.mutedText }]}>v{version}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

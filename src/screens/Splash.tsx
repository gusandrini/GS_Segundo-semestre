import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { styles } from '@/styles/screens/Splash';

export default function Splash() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        {/* Logo / Marca (use sua imagem aqui se tiver) */}
        <View style={styles.logoWrap}>
          {/* Exemplo com texto de marca caso não tenha logo */}
          {/* <Image source={require('@/assets/logo.png')} style={styles.logo} resizeMode="contain" /> */}
          <Text style={[styles.appName, { color: theme.colors.primary }]}>CareerShift AI</Text>
        </View>

        {/* Frase principal */}
        <Text style={[styles.headline, { color: theme.colors.text }]}>
          Descubra seu futuro profissional com IA.
        </Text>

        {/* Subtexto */}
        <Text style={[styles.subtext, { color: theme.colors.mutedText }]}>
          Analise seu perfil, veja sua chance de mudar de carreira e encontre novas oportunidades.
        </Text>

        {/* Ações */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: theme.colors.primary }]}
            activeOpacity={0.9}
            onPress={() => (navigation as any).navigate('Login')}
          >
            <Text style={[styles.primaryBtnText, { color: theme.colors.primaryText }]}>
              Entrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: theme.colors.primary }]}
            activeOpacity={0.85}
            onPress={() => (navigation as any).navigate('Cadastro')}
          >
            <Text style={[styles.secondaryBtnText, { color: theme.colors.primary }]}>
              Criar Conta
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé com versão */}
        <Text style={[styles.version, { color: theme.colors.mutedText }]}>
          v{version}
        </Text>
      </View>
    </SafeAreaView>
  );
}

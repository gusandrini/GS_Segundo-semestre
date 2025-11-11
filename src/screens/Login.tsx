import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { useSession } from '@/services/SessionProvider';


import { styles } from '@/styles/screens/Login';

export default function Login({ navigation }: any) {
  const { login } = useSession();
  const { theme, isDark, toggleTheme } = useTheme();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    try {
      setLoading(true);
      const ok = await login(email, password);

      if (!ok) {
        Alert.alert('Credenciais inválidas', 'E-mail ou senha incorretos.');
        return;
      }


      navigation.replace('Home');
    } catch (err: any) {
      console.error('Erro no login:', err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          Alert.alert('Credenciais inválidas', 'E-mail ou senha incorretos.');
        } else if (err.response?.status === 500) {
          Alert.alert('Erro no servidor', 'Ocorreu um erro interno. Tente novamente.');
        } else {
          Alert.alert('Erro de conexão', 'Não foi possível conectar. Verifique sua internet.');
        }
      } else {
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Entrar</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Acesse sua conta para continuar
        </Text>

        <View
          style={[
            styles.inputContainer,
            { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
          ]}
        >
          <Ionicons name="mail-outline" size={20} color={theme.colors.primary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="E-mail"
            placeholderTextColor={theme.colors.mutedText}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color={theme.colors.primary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Senha"
            placeholderTextColor={theme.colors.mutedText}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Ionicons name="log-in-outline" size={22} color={theme.colors.primaryText} />
          <Text style={[styles.buttonText, { color: theme.colors.primaryText }]}>
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={[styles.registerText, { color: theme.colors.primary }]}>
            Criar conta
          </Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          {/* Botão de tema (mantido, mas sem i18n) */}
          <TouchableOpacity
            style={[styles.switchBtn, { backgroundColor: theme.colors.surface }]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={18} color={theme.colors.text} />
            <Text style={[styles.switchText, { color: theme.colors.text }]}>
              {isDark ? 'Modo claro' : 'Modo escuro'}
            </Text>
          </TouchableOpacity>

          {/* REMOVIDO: botão de idioma */}
        </View>
      </View>

      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: '#fff' }]}>Entrando...</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

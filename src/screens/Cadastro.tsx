import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { addUsuario } from '@/api/usuario';
import { useTheme } from '@/context/ThemeContext';
import { Usuario } from '@/models/usuario';
import { styles } from '@/styles/screens/Cadastro';

export default function CadastroUsuario({ navigation }: any) {
  const { theme } = useTheme();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const validarEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }

    // Payload NO FORMATO do seu backend
    const payload: Omit<Usuario, 'idUsuario'> = {
      nmCliente: nome,
      nmEmail: email,
      nmSenha: senha,
      // funcoes: [] // se quiser enviar depois
    };

    try {
      setLoading(true);
      await addUsuario(payload);

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);

      setNome('');
      setEmail('');
      setSenha('');
    } catch (error: any) {
      console.error('[CadastroUsuario] Erro ao cadastrar:', error);

      if (error?.response) {
        if (error.response.status === 401) {
          Alert.alert(
            'Não autorizado',
            'Você não tem permissão para realizar esta ação.'
          );
        } else if (error.response.status === 403) {
          Alert.alert(
            'Acesso negado',
            'Acesso proibido para este usuário.'
          );
        } else {
          const msg =
            error.response.data?.message ||
            error.response.data?.error ||
            'Erro desconhecido no servidor.';
          Alert.alert(`Erro ${error.response.status}`, msg);
        }
      } else {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* overlay de carregamento */}
      <Modal transparent visible={loading}>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Salvando...
          </Text>
        </View>
      </Modal>

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Nome */}
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Nome
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.surface,
              },
            ]}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor={theme.colors.mutedText}
          />

          {/* E-mail */}
          <Text style={[styles.label, { color: theme.colors.text }]}>
            E-mail
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.surface,
              },
            ]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="exemplo@dominio.com"
            placeholderTextColor={theme.colors.mutedText}
          />

          {/* Senha */}
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Senha
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.surface,
              },
            ]}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="Digite sua senha"
            placeholderTextColor={theme.colors.mutedText}
          />

          {/* Botão salvar */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleSave}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Ionicons name="save" size={20} color={theme.colors.primaryText} />
            <Text
              style={[styles.buttonText, { color: theme.colors.primaryText }]}
            >
              Criar conta
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

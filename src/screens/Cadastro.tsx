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

import { useTheme } from '@/context/ThemeContext';

import { addFuncionario } from '@/api/funcionario';
import { FuncionarioCad } from '@/models/funcionarioCad';

import { styles } from '@/styles/screens/Cadastro';

export default function CadastroFuncionario({ navigation }: any) {
  const { theme } = useTheme();

  const [nome, setNome] = useState('');
  const [emailCorporativo, setEmailCorporativo] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('');
  const [idFilial, setIdFilial] = useState('');
  const [loading, setLoading] = useState(false);

  const validarEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = async () => {
    if (!nome || !emailCorporativo || !senha || !cargo) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }
    if (!validarEmail(emailCorporativo)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }

    const payload: FuncionarioCad = {
      idFuncionario: 0,
      idFilial: idFilial ? Number(idFilial) : 0,
      nome,
      emailCorporativo,
      senhaHash: senha,
      cargo,
    };

    try {
      setLoading(true);
      await addFuncionario(payload);
      Alert.alert('Sucesso', 'Funcionário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
      setNome('');
      setEmailCorporativo('');
      setSenha('');
      setCargo('');
      setIdFilial('');
    } catch (error: any) {
      if (error?.response) {
        if (error.response.status === 401) {
          Alert.alert('Não autorizado', 'Você não tem permissão para realizar esta ação.');
        } else if (error.response.status === 403) {
          Alert.alert('Acesso negado', 'Acesso proibido para este usuário.');
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* overlay de carregamento */}
      <Modal transparent visible={loading}>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>Salvando...</Text>
        </View>
      </Modal>

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {/* Nome */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Nome</Text>
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
            placeholder="Digite o nome"
            placeholderTextColor={theme.colors.mutedText}
          />

          {/* Email corporativo */}
          <Text style={[styles.label, { color: theme.colors.text }]}>E-mail corporativo</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.surface,
              },
            ]}
            value={emailCorporativo}
            onChangeText={setEmailCorporativo}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="exemplo@empresa.com"
            placeholderTextColor={theme.colors.mutedText}
          />

          {/* Senha */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Senha</Text>
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
            placeholder="Digite a senha"
            placeholderTextColor={theme.colors.mutedText}
          />

          {/* Cargo */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Cargo</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.surface,
              },
            ]}
            value={cargo}
            onChangeText={setCargo}
            placeholder="Digite o cargo"
            placeholderTextColor={theme.colors.mutedText}
          />

          {/* Id Filial (opcional) */}
          <Text style={[styles.label, { color: theme.colors.text }]}>ID da Filial (opcional)</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.surface,
              },
            ]}
            value={idFilial}
            onChangeText={setIdFilial}
            keyboardType="numeric"
            placeholder="Ex: 1"
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
            <Text style={[styles.buttonText, { color: theme.colors.primaryText }]}>
              Salvar Funcionário
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

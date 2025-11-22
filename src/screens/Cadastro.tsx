import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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

import { addUsuario, updateUsuario } from '@/api/usuario';
import { useTheme } from '@/context/ThemeContext';
import { Usuario } from '@/models/usuario';
import { styles } from '@/styles/screens/Cadastro';

export default function CadastroUsuario() {
  const { theme } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  // Se vier usuario via params, estamos em modo edição
  const usuarioEdicao: Usuario | undefined = route.params?.usuario;
  const isEdit = !!usuarioEdicao;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Preenche o formulário se for edição
  useEffect(() => {
    if (isEdit && usuarioEdicao) {
      setNome(usuarioEdicao.nmCliente);
      setEmail(usuarioEdicao.nmEmail);
      // senha fica vazia; se o usuário não alterar, manteremos a antiga
    }
  }, [isEdit, usuarioEdicao]);

  const validarEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = async () => {
    if (!nome || !email) {
      Alert.alert('Erro', 'Nome e e-mail são obrigatórios.');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }

    // Para CADASTRO, senha é obrigatória
    if (!isEdit && !senha) {
      Alert.alert('Erro', 'A senha é obrigatória para criar uma conta.');
      return;
    }

    try {
      setLoading(true);

      if (isEdit && usuarioEdicao) {
        // 🟢 MODO EDIÇÃO → atualizar usuário existente
        const payloadAtualizar: Usuario = {
          ...usuarioEdicao,
          nmCliente: nome,
          nmEmail: email,
          // se o campo de senha estiver vazio, mantém a senha antiga
          nmSenha: senha || usuarioEdicao.nmSenha,
        };

        await updateUsuario(payloadAtualizar);

        Alert.alert('Sucesso', 'Dados atualizados com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        // 🟢 MODO CRIAÇÃO → criar novo usuário
        const payloadCriar: Omit<Usuario, 'idUsuario'> = {
          nmCliente: nome,
          nmEmail: email,
          nmSenha: senha,
          // funcoes: [] // ajuste se precisar
        };

        await addUsuario(payloadCriar);

        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);

        setNome('');
        setEmail('');
        setSenha('');
      }
    } catch (error: any) {
      console.error('[CadastroUsuario] Erro ao salvar:', error);

      if (error?.response) {
        if (error.response.status === 401) {
          Alert.alert(
            'Não autorizado',
            'Você não tem permissão para realizar esta ação.'
          );
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
          {/* Título dinâmico */}
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, marginBottom: 16 },
            ]}
          >
            {isEdit ? 'Editar dados' : 'Criar conta'}
          </Text>

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
            {isEdit ? 'Nova senha (opcional)' : 'Senha'}
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
            placeholder={
              isEdit ? 'Preencha apenas se quiser alterar a senha' : 'Digite sua senha'
            }
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
              {isEdit ? 'Salvar alterações' : 'Criar conta'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

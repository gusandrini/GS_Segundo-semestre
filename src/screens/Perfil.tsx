import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import { styles } from '@/styles/screens/Perfil';

import { getUsuario } from '@/api/usuario';
import type { Usuario } from '@/models/usuario';

export default function Perfil() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsuario = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      // Se não tiver usuário salvo, manda pra Cadastro (ou Login, se preferir)
      if (!userId) {
        (navigation as any).reset({
          index: 0,
          routes: [{ name: 'Cadastro' }],
        });
        return;
      }

      const idNumber = Number(userId);
      if (Number.isNaN(idNumber)) {
        (navigation as any).reset({
          index: 0,
          routes: [{ name: 'Cadastro' }],
        });
        return;
      }

      const response = await getUsuario(idNumber);
      setUsuario(response.data);
    } catch (error) {
      console.error('[Perfil][fetchUsuario] Erro ao carregar usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar seus dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userId', 'token']);
    } catch {}
    setUsuario(null);
    (navigation as any).reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  // transforma array de Função em string
  const funcoesText =
    usuario?.funcoes && usuario.funcoes.length > 0
      ? usuario.funcoes.map((f) => f.nmFuncao).join(', ')
      : '—';

  // senha mascarada (opcional, só pra não mostrar a senha real)
  const senhaMascarada =
    usuario?.nmSenha && usuario.nmSenha.length > 0
      ? '•'.repeat(Math.max(usuario.nmSenha.length, 8))
      : '—';

  return (
    <AppLayout title="Perfil" activeScreen="Perfil">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Meu Perfil</Text>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
        ) : usuario ? (
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <InfoRow
              icon="person-outline"
              label="Nome"
              value={usuario.nmCliente ?? '—'}
              colorPrimary={theme.colors.primary}
              colorText={theme.colors.text}
            />
            <InfoRow
              icon="mail-outline"
              label="E-mail"
              value={usuario.nmEmail ?? '—'}
              colorPrimary={theme.colors.primary}
              colorText={theme.colors.text}
            />
            <InfoRow
              icon="briefcase-outline"
              label="Funções"
              value={funcoesText}
              colorPrimary={theme.colors.primary}
              colorText={theme.colors.text}
            />
            <InfoRow
              icon="lock-closed-outline"
              label="Senha"
              value={senhaMascarada}
              colorPrimary={theme.colors.primary}
              colorText={theme.colors.text}
            />
          </View>
        ) : (
          <Text style={[styles.empty, { color: theme.colors.text }]}>
            Não encontramos seus dados.
          </Text>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.85}
            style={[styles.logoutBtn, { backgroundColor: '#ff3b30' }]}
          >
            <Ionicons name="log-out-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

function InfoRow({
  icon,
  label,
  value,
  colorPrimary,
  colorText,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  colorPrimary: string;
  colorText: string;
}) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={18} color={colorPrimary} style={styles.rowIcon} />
      <Text style={[styles.rowText, { color: colorText }]}>
        <Text style={[styles.rowLabel, { color: colorPrimary }]}>{label}:</Text> {value}
      </Text>
    </View>
  );
}

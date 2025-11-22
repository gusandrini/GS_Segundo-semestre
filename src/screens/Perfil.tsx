import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import { styles } from '@/styles/screens/Perfil';

import { deleteUsuario, getUsuario } from '@/api/usuario'; // 👈 IMPORTANTE
import type { Usuario } from '@/models/usuario';
import { useSession } from '@/services/SessionProvider';

export default function Perfil() {
  const { theme, isDark, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const { logout: logoutSession } = useSession();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsuario = async () => {
    try {
      console.log('🔹 [Perfil] Iniciando fetchUsuario');

      const userId = await AsyncStorage.getItem('userId');
      console.log('🔹 [Perfil] userId do AsyncStorage:', userId);

      if (!userId) {
        (navigation as any).reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return;
      }

      const idNumber = Number(userId);
      console.log('🔹 Buscando usuário por ID:', idNumber);

      const response = await getUsuario(idNumber);
      console.log('✅ Usuário carregado:', response.data);

      setUsuario(response.data);
    } catch (error) {
      console.error('[Perfil][fetchUsuario] Erro:', error);
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
      await logoutSession();
    } catch (e) {
      console.error('[Perfil][logout] Erro:', e);
    }

    (navigation as any).reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleEdit = () => {
    if (!usuario) return;
    (navigation as any).navigate('Cadastro', { usuario });
  };

  const handleDelete = () => {
    if (!usuario) return;

    Alert.alert(
      'Excluir conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);

              console.log('[Perfil][delete] Deletando usuário ID:', usuario.idUsuario);
              const resp = await deleteUsuario(usuario.idUsuario!);
              console.log('[Perfil][delete] Resposta delete:', resp.status);

              // limpar sessão
              await logoutSession();
              await AsyncStorage.clear();

              Alert.alert('Conta excluída', 'Sua conta foi removida com sucesso.');

              (navigation as any).reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (err: any) {
              console.error('[Perfil][delete] Erro ao excluir usuário:', err?.response || err);
              const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                'Não foi possível excluir sua conta.';
              Alert.alert('Erro', msg);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <AppLayout title="Perfil" activeScreen="Perfil">
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: theme.colors.primary },
          ]}
        >
          Meu Perfil
        </Text>

        {loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : usuario ? (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <InfoRow
              icon="person-outline"
              label="Nome"
              value={usuario.nmCliente}
              colorPrimary={theme.colors.primary}
              colorText={theme.colors.text}
            />

            <InfoRow
              icon="mail-outline"
              label="E-mail"
              value={usuario.nmEmail}
              colorPrimary={theme.colors.primary}
              colorText={theme.colors.text}
            />
          </View>
        ) : (
          <Text style={[styles.empty, { color: theme.colors.text }]}>
            Não encontramos seus dados.
          </Text>
        )}

        {/* Troca de tema */}
        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[
              styles.switchBtn,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={18}
              color={theme.colors.text}
            />
            <Text
              style={[
                styles.switchText,
                { color: theme.colors.text },
              ]}
            >
              {isDark ? 'Modo claro' : 'Modo escuro'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ações */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleEdit}
            activeOpacity={0.85}
            style={[
              styles.actionBtn,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.primary,
              },
            ]}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={theme.colors.primary}
            />
            <Text
              style={[
                styles.actionText,
                { color: theme.colors.primary },
              ]}
            >
              Atualizar dados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.85}
            style={[
              styles.actionBtn,
              {
                backgroundColor: theme.colors.error,
                borderColor: theme.colors.error,
              },
            ]}
          >
            <Ionicons name="log-out-outline" size={18} color={theme.colors.primaryText} />
            <Text
              style={[
                styles.actionText,
                { color: theme.colors.primaryText },
              ]}
            >
              Sair da conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            activeOpacity={0.85}
            style={[
              styles.actionBtn,
              {
                backgroundColor: 'transparent',
                borderColor: theme.colors.error,
              },
            ]}
          >
            <Ionicons name="trash-outline" size={18} color={theme.colors.error} />
            <Text
              style={[
                styles.actionText,
                { color: theme.colors.error },
              ]}
            >
              Excluir conta
            </Text>
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
  icon: any;
  label: string;
  value: string;
  colorPrimary: string;
  colorText: string;
}) {
  return (
    <View style={styles.row}>
      <Ionicons
        name={icon}
        size={18}
        color={colorPrimary}
        style={styles.rowIcon}
      />
      <Text style={[styles.rowText, { color: colorText }]}>
        <Text style={[styles.rowLabel, { color: colorPrimary }]}>{label}:</Text>{' '}
        {value}
      </Text>
    </View>
  );
}

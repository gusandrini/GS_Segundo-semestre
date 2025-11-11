import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import { styles } from '@/styles/screens/Perfil';

import { getFuncionario } from '@/api/funcionario';
import { Funcionario } from '@/models/funcionario';

export default function Perfil() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFuncionario = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        (navigation as any).reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }

      const response = await getFuncionario(userId);
      setFuncionario(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar seus dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuncionario();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userId', 'token']);
      setFuncionario(null);
      (navigation as any).reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao sair da conta. Tente novamente.');
    }
  };

  return (
    <AppLayout title="Perfil" activeScreen="Cadastro">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Meu Perfil</Text>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
        ) : funcionario ? (
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <InfoRow
              icon="person-outline"
              label="Nome"
              value={funcionario.nome}
              colorPrimary={theme.colors.primary}
              colorText={theme.colors.text}
            />
            <InfoRow
              icon="mail-outline"
              label="E-mail corporativo"
              value={funcionario.emailCorporativo}
              colorPrimary={theme.colors.primary}
              colorText={theme.colors.text}
            />
            <InfoRow
              icon="briefcase-outline"
              label="Cargo"
              value={funcionario.cargo}
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

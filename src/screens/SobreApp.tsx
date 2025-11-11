import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import { styles } from '@/styles/screens/SobreApp';

export default function SobreApp() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <AppLayout title="Sobre o App" activeScreen="SobreApp">
      <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
        <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 32 }]}>
          {/* Título principal */}
          <Text style={[styles.title, { color: theme.colors.primary }]}>Sobre o App</Text>
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            Informações técnicas e créditos da equipe
          </Text>

          {/* Seção: Informações do Sistema */}
          <View style={styles.section}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <View>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Informações do Sistema
              </Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>
                Nome do App: <Text style={{ fontWeight: '600' }}>CareerShift AI</Text>
              </Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>
                Versão: <Text style={{ fontWeight: '600' }}>v1.0.0</Text>
              </Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>
                Hash de Commit: <Text style={{ fontWeight: '600' }}>#a1b2c3d</Text>
              </Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>
                Data da Compilação: <Text style={{ fontWeight: '600' }}>10/11/2025</Text>
              </Text>
            </View>
          </View>

          {/* Seção: Desenvolvido por */}
          <View style={styles.section}>
            <Feather name="users" size={24} color={theme.colors.primary} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Desenvolvido por
              </Text>

              <View style={{ marginTop: 8 }}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Área</Text>
                  <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Integrante</Text>
                  <Text style={[styles.tableHeaderText, { flex: 1 }]}>RM</Text>
                  <Text style={[styles.tableHeaderText, { flex: 1 }]}>Curso</Text>
                </View>

                {[
                  { area: 'Mobile', nome: '[Nome]', rm: '[RM]', curso: '2TDSPW' },
                  { area: 'Backend Java', nome: '[Nome]', rm: '[RM]', curso: '2TDSPH' },
                  { area: 'IA (Python)', nome: '[Nome]', rm: '[RM]', curso: '2TDSPW' },
                  { area: 'Banco de Dados', nome: '[Nome]', rm: '[RM]', curso: '2TDSPH' },
                ].map((membro, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <Text style={[styles.tableText, { flex: 1.2 }]}>{membro.area}</Text>
                    <Text style={[styles.tableText, { flex: 1.5 }]}>{membro.nome}</Text>
                    <Text style={[styles.tableText, { flex: 1 }]}>{membro.rm}</Text>
                    <Text style={[styles.tableText, { flex: 1 }]}>{membro.curso}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Seção: Tecnologias */}
          <View style={styles.section}>
            <MaterialIcons name="code" size={24} color={theme.colors.primary} style={styles.icon} />
            <View>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Tecnologias Utilizadas
              </Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>• React Native (Expo)</Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>• Spring Boot (Java)</Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>• Python + Scikit-Learn</Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>• MySQL</Text>
              <Text style={[styles.text, { color: theme.colors.text }]}>• Firebase / Render</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppLayout>
  );
}

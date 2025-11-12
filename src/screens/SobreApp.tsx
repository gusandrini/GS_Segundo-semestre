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
      <SafeAreaView
        style={[styles.screen, { backgroundColor: theme.colors.background }]}
        edges={['bottom']} 
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingBottom: 24, paddingTop: 0 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho local */}
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>Sobre o App</Text>
            <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
              Informações técnicas e créditos
            </Text>
          </View>

          {/* Card: Informações do Sistema */}
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="information-circle-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                Informações do Sistema
              </Text>
            </View>

            <View style={styles.kvList}>
              <Text style={[styles.kvItem, { color: theme.colors.text }]}>
                <Text style={styles.kvKey}>Nome: </Text>
                <Text style={styles.kvVal}>Nexo</Text>
              </Text>
              <Text style={[styles.kvItem, { color: theme.colors.text }]}>
                <Text style={styles.kvKey}>Versão: </Text>
                <Text style={styles.kvVal}>v1.0.0</Text>
              </Text>
              <Text style={[styles.kvItem, { color: theme.colors.text }]}>
                <Text style={styles.kvKey}>Commit: </Text>
                <Text style={styles.kvVal}>#a1b2c3d</Text>
              </Text>
              <Text style={[styles.kvItem, { color: theme.colors.text }]}>
                <Text style={styles.kvKey}>Build: </Text>
                <Text style={styles.kvVal}>10/11/2025</Text>
              </Text>
            </View>
          </View>

          {/* Card: Desenvolvido por */}
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <Feather name="users" size={20} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Desenvolvido por</Text>
            </View>

            <View style={styles.table}>
              <View style={[styles.tableHeader, { borderColor: theme.colors.border }]}>
                <Text style={[styles.th, { flex: 1.1, color: theme.colors.mutedText }]}>Área</Text>
                <Text style={[styles.th, { flex: 1.6, color: theme.colors.mutedText }]}>Integrante</Text>
                <Text style={[styles.th, { flex: 0.9, color: theme.colors.mutedText }]}>RM</Text>
                <Text style={[styles.th, { flex: 1, color: theme.colors.mutedText }]}>Curso</Text>
              </View>

              {[
                { area: 'Mobile', nome: 'Gustavo Sandrini', rm: '557505', curso: '2TDSPW' },
                { area: 'Java', nome: 'Eduarda Tiemi', rm: '554756', curso: '2TDSPH' },
                { area: 'IoT', nome: 'Felipe Pizzinato', rm: '555141', curso: '2TDSPW' },
              ].map((m, i) => (
                <View
                  key={i}
                  style={[
                    styles.tr,
                    {
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.surface, 
                    },
                  ]}
                >
                  <Text style={[styles.td, { flex: 1.1, color: theme.colors.text }]}>{m.area}</Text>
                  <Text style={[styles.td, { flex: 1.6, color: theme.colors.text }]}>{m.nome}</Text>
                  <Text style={[styles.td, { flex: 0.9, color: theme.colors.text }]}>{m.rm}</Text>
                  <Text style={[styles.td, { flex: 1, color: theme.colors.text }]}>{m.curso}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Card: Tecnologias */}
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <MaterialIcons name="code" size={20} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Tecnologias</Text>
            </View>

            <View style={styles.tagsWrap}>
              {['React Native (Expo)', 'Spring Boot', 'Python / Scikit-Learn', 'MySQL', 'Firebase', 'Render'].map(
                (t) => (
                  <View
                    key={t}
                    style={[
                      styles.tag,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                      },
                    ]}
                  >
                    <Text style={[styles.tagText, { color: theme.colors.text }]}>{t}</Text>
                  </View>
                ),
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppLayout>
  );
}

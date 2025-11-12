import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import { styles } from '@/styles/screens/SobreSolucao';

export default function SobreSolucao() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <AppLayout title="Sobre a solução" activeScreen="SobreSolucao">
      <SafeAreaView
        style={[styles.screen, { backgroundColor: theme.colors.background }]}
        edges={['bottom']} 
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 24, paddingTop: 0 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Título e subtítulo */}
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>Sobre a Solução</Text>
            <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
              Explicação clara do propósito e funcionamento do CareerShift AI
            </Text>
          </View>

          {/* 1. O que é o Nexo */}
          <View style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
          ]}>
            <View style={styles.cardHeader}>
              <Ionicons name="bulb-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                O que é o Nexo
              </Text>
            </View>
            <View style={[
              styles.quoteBox,
              { backgroundColor: theme.colors.background, borderColor: theme.colors.border }
            ]}>
              <Text style={[styles.quoteText, { color: theme.colors.text }]}>
                “Uma plataforma que utiliza IA para ajudar pessoas a entender o futuro do trabalho e
                encontrar caminhos profissionais baseados em dados.”
              </Text>
            </View>
          </View>

          {/* 2. Como funciona */}
          <View style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
          ]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="schema" size={20} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                Como funciona
              </Text>
            </View>
            <View style={styles.list}>
              <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Você informa seu perfil.
              </Text>
              <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • A IA analisa seus dados.
              </Text>
              <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • O app mostra a probabilidade de mudança de carreira e sugere oportunidades.
              </Text>
            </View>
          </View>

          {/* 3. Base de dados */}
          <View style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
          ]}>
            <View style={styles.cardHeader}>
              <Feather name="database" size={20} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                Base de dados
              </Text>
            </View>
            <View style={[
              styles.quoteBox,
              { backgroundColor: theme.colors.background, borderColor: theme.colors.border }
            ]}>
              <Text style={[styles.quoteText, { color: theme.colors.text }]}>
                “Utilizamos um dataset real com informações sobre profissões, níveis de satisfação,
                escolaridade e evolução de mercado.”
              </Text>
            </View>
          </View>

          {/* 4. Benefícios */}
          <View style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
          ]}>
            <View style={styles.cardHeader}>
              <Ionicons name="trending-up-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                Benefícios
              </Text>
            </View>
            <View style={styles.list}>
              <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Decisões de carreira mais seguras
              </Text>
              <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Recomendações personalizadas
              </Text>
              <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Tendências do mercado em tempo real
              </Text>
            </View>
          </View>

          {/* 5. Limites da IA */}
          <View style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
          ]}>
            <View style={styles.cardHeader}>
              <Ionicons name="alert-circle-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                Limites da IA
              </Text>
            </View>
            <View style={[
              styles.quoteBox,
              { backgroundColor: theme.colors.background, borderColor: theme.colors.border }
            ]}>
              <Text style={[styles.quoteText, { color: theme.colors.text }]}>
                “As previsões são estimativas e não determinam o sucesso profissional. Elas
                servem como apoio para suas decisões.”
              </Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </AppLayout>
  );
}

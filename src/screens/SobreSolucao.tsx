import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { styles } from '@/styles/screens/SobreSolucao';

export default function SobreSolucao() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 32 }]}>

        {/* Título e subtítulo */}
        <Text style={[styles.title, { color: theme.colors.primary }]}>Sobre a Solução</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Explicação clara do propósito e funcionamento do CareerShift AI
        </Text>

        {/* 1. O que é o CareerShift AI */}
        <View style={styles.section}>
          <Ionicons
            name="bulb-outline"
            size={24}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              O que é o CareerShift AI
            </Text>
            <View style={[styles.quoteBox, { borderLeftColor: theme.colors.primary }]}>
              <Text style={[styles.quoteText, { color: theme.colors.text }]}>
                “Uma plataforma que utiliza IA para ajudar pessoas a entender o futuro do trabalho e
                encontrar caminhos profissionais baseados em dados.”
              </Text>
            </View>
          </View>
        </View>

        {/* 2. Como funciona */}
        <View style={styles.section}>
          <MaterialIcons
            name="schema"
            size={24}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Como funciona
            </Text>
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
        </View>

        {/* 3. Base de dados */}
        <View style={styles.section}>
          <Feather
            name="database"
            size={24}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Base de dados
            </Text>
            <View style={[styles.quoteBox, { borderLeftColor: theme.colors.primary }]}>
              <Text style={[styles.quoteText, { color: theme.colors.text }]}>
                “Utilizamos um dataset real com informações sobre profissões, níveis de satisfação,
                escolaridade e evolução de mercado.”
              </Text>
            </View>
          </View>
        </View>

        {/* 4. Benefícios */}
        <View style={styles.section}>
          <Ionicons
            name="trending-up-outline"
            size={24}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Benefícios
            </Text>
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
        </View>

        {/* 5. Limites da IA */}
        <View style={styles.section}>
          <Ionicons
            name="alert-circle-outline"
            size={24}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Limites da IA
            </Text>
            <View style={[styles.quoteBox, { borderLeftColor: theme.colors.primary }]}>
              <Text style={[styles.quoteText, { color: theme.colors.text }]}>
                “As previsões são estimativas e não determinam o sucesso profissional. Elas
                servem como apoio para suas decisões.”
              </Text>
            </View>
          </View>
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity
          style={[
            styles.backButton,
            { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
          ]}
          onPress={() => navigation.navigate('Home' as never)}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-back-outline" size={20} color={theme.colors.text} />
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>
            Voltar à Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

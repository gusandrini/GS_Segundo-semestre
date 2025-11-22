import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import { styles as localStyles } from '@/styles/screens/Home';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const images = [
  require('@/assets/business-conference-vr-office.jpg'),
  require('@/assets/homem_futuro.webp'),
  require('@/assets/pessoas_futuro.webp'),
  require('@/assets/woman-answering-hologram-call-arm.jpg'),
];

export default function Home() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <AppLayout title="Início" activeScreen="Home">
      <ScrollView contentContainerStyle={localStyles.container}>
        {/* Título e subtítulo */}
        <Text style={[localStyles.title, { color: theme.colors.primary }]}>
          Seja Bem-vindo!
        </Text>
        <Text style={[localStyles.title, { color: theme.colors.primary }]}>
          O futuro do trabalho começa com você.
        </Text>

        <Text style={[localStyles.subtitle, { color: theme.colors.text }]}>
          Descubra sua probabilidade de mudança de carreira, visualize tendências do mercado e encontre novas oportunidades com o poder da IA.
        </Text>

        {/* Carrossel */}
        <View style={localStyles.carouselContainer}>
          <Swiper
            autoplay
            autoplayTimeout={4.5}
            showsPagination
            dotColor={theme.colors.border}
            activeDotColor={theme.colors.primary}
          >
            {images.map((img, index) => (
              <View key={index} style={localStyles.slide}>
                <Image source={img} style={localStyles.carouselImage} resizeMode="cover" />
              </View>
            ))}
          </Swiper>
        </View>

        {/* Ações rápidas */}
        <View style={localStyles.section}>
          <Text style={[localStyles.sectionTitle, { color: theme.colors.text }]}>Ações rápidas</Text>

          <View style={localStyles.actionsRow}>
            <TouchableOpacity
            style={[
              localStyles.actionCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
            onPress={() => navigation.navigate('DescricaoClienteForm' as never)} // <<< AQUI
          >
            <Text style={[localStyles.actionTitle, { color: theme.colors.text }]}>Fazer previsão</Text>
            <Text style={[localStyles.actionDesc, { color: theme.colors.mutedText }]}>
              Calcule sua chance de mudança de carreira.
            </Text>
          </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                localStyles.actionCard,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              ]}
            >
              <Text style={[localStyles.actionTitle, { color: theme.colors.text }]}>Formulário</Text>
              <Text style={[localStyles.actionDesc, { color: theme.colors.mutedText }]}>
                Preencha o formulário para nossa IA.
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Destaques */}
        <View style={localStyles.section}>
          <Text style={[localStyles.sectionTitle, { color: theme.colors.text }]}>Destaques</Text>

          <View
            style={[
              localStyles.card,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Text style={[localStyles.cardTitle, { color: theme.colors.text }]}>
              IA que entende seu perfil
            </Text>
            <Text style={[localStyles.cardDesc, { color: theme.colors.mutedText }]}>
              Insights que impulsionam seu amanhã. Resultados explicáveis e personalizados.
            </Text>

            <View style={localStyles.badgeRow}>
              <View style={[localStyles.badge, { backgroundColor: '#144dcf' }]}>
                <Text style={localStyles.badgeTextLight}>Tendências</Text>
              </View>
              <View style={[localStyles.badge, { backgroundColor: '#4dff4a' }]}>
                <Text style={localStyles.badgeTextDark}>Empregos verdes</Text>
              </View>
              <View style={[localStyles.badge, { backgroundColor: '#eded53' }]}>
                <Text style={localStyles.badgeTextDark}>Reskilling</Text>
              </View>
              <View style={[localStyles.badge, { backgroundColor: '#ff443e' }]}>
                <Text style={localStyles.badgeTextLight}>Alerta</Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA principal */}
        <TouchableOpacity
          style={[
            localStyles.cta,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text style={[localStyles.ctaText, { color: theme.colors.primaryText }]}>
            Explorar recomendações
          </Text>
        </TouchableOpacity>

        {/* Espaço final */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </AppLayout>
  );
}

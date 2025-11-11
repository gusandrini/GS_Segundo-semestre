import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import { styles as localStyles } from '@/styles/screens/Home';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

// Imagens de exemplo (substitua pelos seus assets)
const images = [
  require('@/assets/business-conference-vr-office.jpg'),
  require('@/assets/homem_futuro.webp'),
  require('@/assets/pessoas_futuro.webp'),
  require('@/assets/woman-answering-hologram-call-arm.jpg'),
];

export default function Home() {
  const { theme } = useTheme();

  return (
    <AppLayout title="Início" activeScreen="Home">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        
        {/* Título principal */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: theme.colors.primary,
            marginBottom: 12,
          }}
        >
          Seja Bem-vindo! O futuro do trabalho começa com você.
        </Text>

        {/* Subtítulo */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: theme.colors.text,
            marginBottom: 20,
          }}
        >
          Descubra sua probabilidade de mudança de carreira, visualize tendências do mercado e encontre novas oportunidades com o poder da IA.
        </Text>

        {/* Carrossel com Swiper */}
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

        {/* Card ou conteúdo extra */}
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: 12,
            padding: 16,
            marginTop: 24,
          }}
        >
          <Text style={{ color: theme.colors.text }}>
            IA que entende seu perfil. Insights que impulsionam seu amanhã.
          </Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
}
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useTheme } from '@/context/ThemeContext';

interface AppLayoutProps {
  title?: string;
  children: ReactNode;
  activeScreen?: string;
  showBack?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
}

export function AppLayout({
  title,
  children,
  activeScreen,
  showBack = false,
  rightIcon,
  onRightPress,
}: AppLayoutProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title={title}
        showBack={showBack}
        rightIcon={rightIcon}
        onRightPress={onRightPress}
      />

      <View style={styles.content}>{children}</View>

      <Footer
        activeScreen={activeScreen}
        items={[
          { label: 'Home',       icon: 'home-outline',                 screen: 'Home' },
          { label: 'Sobre App',  icon: 'information-circle-outline',   screen: 'SobreApp' },
          { label: 'Solução',    icon: 'bulb-outline',                 screen: 'SobreSolucao' },
          { label: 'Perfil',     icon: 'person-outline',               screen: 'Perfil' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});

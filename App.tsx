import { useTheme } from '@/context/ThemeContext';
import { AppNavigation } from '@/navigation/index';
import { AppProviders } from '@/providers/AppProviders';
import React from 'react';
import { StatusBar } from 'react-native';

function Root() {
  const { theme, isDark } = useTheme();
  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.surface}
      />
      <AppNavigation />
    </>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Root />
    </AppProviders>
  );
}

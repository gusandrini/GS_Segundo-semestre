import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useTheme } from '@/context/ThemeContext';

// Screens de fluxo inicial
import Cadastro from '@/screens/Cadastro';
import Login from '@/screens/Login';
import Splash from '@/screens/Splash';
import { RootTabs } from './RootTabs';

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  const { theme } = useTheme();

  const base = theme.name === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Tabs" component={RootTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

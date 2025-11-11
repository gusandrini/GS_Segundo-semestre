import { useTheme } from '@/context/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// Screens
import Cadastro from '@/screens/Cadastro'; // ou '@/screens/CadastroFuncionario'
import Home from '@/screens/Home';
import SobreApp from '@/screens/SobreApp';
import SobreSolucao from '@/screens/SobreSolucao';

const Tab = createBottomTabNavigator();

export function RootTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,                 // AppLayout já tem Header
        tabBarStyle: { display: 'none' },   // AppLayout já tem Footer
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedText,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SobreApp" component={SobreApp} />
      <Tab.Screen name="SobreSolucao" component={SobreSolucao} />
      <Tab.Screen name="Cadastro" component={Cadastro} />
    </Tab.Navigator>
  );
}

import { useTheme } from '@/context/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';


import Home from '@/screens/Home';
import Perfil from '@/screens/Perfil';
import SobreApp from '@/screens/SobreApp';
import SobreSolucao from '@/screens/SobreSolucao';
import { RootTabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      // Usar o background do tema nas transições (sem flicker)
      sceneContainerStyle={{ backgroundColor: theme.colors.background }}
      // Header/TabBar nativos ocultos (AppLayout renderiza Header/Footer custom)
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
        lazy: true,
        unmountOnBlur: false,
        // Mantidas as cores caso no futuro você queira reativar a tab bar nativa
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedText,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SobreApp" component={SobreApp} />
      <Tab.Screen name="SobreSolucao" component={SobreSolucao} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

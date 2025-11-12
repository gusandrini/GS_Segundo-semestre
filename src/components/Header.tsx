import { useTheme } from '@/context/ThemeContext';
import { styles } from '@/styles/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  logoSource?: any;
  onLogoPress?: () => void;
}

export function Header({
  title,
  showBack = false,
  rightIcon,
  onRightPress,
  logoSource = require('@/assets/NEXO.png'),
  onLogoPress,
}: HeaderProps) {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleLogoPress = () => {
    if (onLogoPress) {
      onLogoPress();
    } else {
      (navigation as any).navigate?.('Home');
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.surface,
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 1,
        paddingTop: Platform.OS === 'ios' ? 10 : 20, 
      }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.surface, height: theme.sizes.header },
        ]}
      >
        {/* Logo centralizada */}
        <TouchableOpacity onPress={handleLogoPress} activeOpacity={0.8}>
          <Image
            source={logoSource}
            style={{
              width: 150, 
              height: 150,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

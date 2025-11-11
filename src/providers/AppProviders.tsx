import { ThemeProvider } from '@/context/ThemeContext';
import { SessionProvider } from '@/services/SessionProvider';
import React, { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}

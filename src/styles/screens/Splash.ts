// src/styles/screens/Splash.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    //paddingBottom: 100,
    justifyContent: 'space-between',
  },

  // Centro: logo + mensagens
  centerBlock: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  headline: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
    opacity: 0.95,
    maxWidth: 380,
  },

  // Ações no rodapé
  actions: {
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  secondaryBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },

  version: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 4,
    opacity: 0.8,
  },
});

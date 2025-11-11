import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Topo (logo + nome)
  logoWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Mensagens
  headline: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    opacity: 0.9,
  },

  // Ações
  actions: {
    width: '100%',
    marginTop: 24,
    gap: 12,
  },
  primaryBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },

  // Rodapé
  version: {
    fontSize: 12,
    marginBottom: 12,
  },
});

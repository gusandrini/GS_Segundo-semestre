import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1 },

  container: {
    paddingHorizontal: 16,
    gap: 16, // controla espaço entre cards
  },

  // Títulos da página
  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
    marginTop: 10,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '400',
  },

  // Card base
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Texto
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },

  // Citações/blockquote
  quoteBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.95,
  },

  // Lista simples (bullets)
  list: { gap: 6 },
  listItem: {
    fontSize: 15,
    lineHeight: 22,
  },

  // Botão (se quiser usar depois)
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    marginTop: 8,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

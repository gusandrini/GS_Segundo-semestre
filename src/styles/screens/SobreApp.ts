import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    gap: 16, // controla o espaço entre cards
  },

  // Títulos da página
  title: {
    fontSize: 20,
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

  // Key-Value list (Informações do Sistema)
  kvList: { gap: 4 },
  kvItem: { fontSize: 14, lineHeight: 20 },
  kvKey: { fontWeight: '500', opacity: 0.9 },
  kvVal: { fontWeight: '600' },

  // Tabela (Desenvolvido por)
  table: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  th: {
    fontSize: 12,
    fontWeight: '600',
  },
  tr: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  td: {
    fontSize: 13,
  },

  // Tags (Tecnologias)
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },

  icon: {
    marginRight: 12,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },

  // ====== Tabela (Desenvolvido por) ======
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 6,
  },

  tableHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'left',
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },

  tableText: {
    fontSize: 14,
  },

  // ====== Botão Voltar ======
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    marginTop: 24,
    gap: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

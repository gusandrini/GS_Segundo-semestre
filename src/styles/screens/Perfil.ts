import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },

  loadingWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },

  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  rowIcon: {
    marginRight: 12,
  },

  rowText: {
    fontSize: 15,
    flexShrink: 1,
  },

  rowLabel: {
    fontWeight: '600',
  },

  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },

  // Linha do switch de tema
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },

  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },

  switchText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },

  // Ações (botões Atualizar / Sair)
  actions: {
    alignItems: 'stretch',
    gap: 10,
    marginTop: 8,
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },

  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

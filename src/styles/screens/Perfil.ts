import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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

  actions: {
    alignItems: 'center',
    marginTop: 8,
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

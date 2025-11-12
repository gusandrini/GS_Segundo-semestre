import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingHorizontal: 12,
  },
  iconLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  iconRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

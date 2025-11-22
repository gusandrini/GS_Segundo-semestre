// src/styles/screens/DescricaoCliente.ts
import { StyleSheet } from 'react-native';

export const stylesDescricao = StyleSheet.create({
  screen: {
    flex: 1,
  },

  scroll: {
    padding: 16,
    paddingBottom: 32,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },

  inputWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },

  input: {
    fontSize: 15,
  },

    pickerWrapper: {
    borderWidth: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#144ccfc5', // fundo cinza claro para destacar no tema light
    },


  resultadoCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },

  resultadoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  resultadoText: {
    fontSize: 15,
    lineHeight: 22,
  },

  button: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

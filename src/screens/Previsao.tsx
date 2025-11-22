import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { AppLayout } from '@/layout/AppLayout';
import { useSession } from '@/services/SessionProvider';

import {
  OPCOES_CAMPO_ESTUDO,
  OPCOES_INFLUENCIA_FAMILIAR,
  OPCOES_NIVEL_EDUCACIONAL,
  OPCOES_OCUPACAO,
} from '@/constants/opcoesDescricaoCliente';

import { predizerMudanca } from '@/api/predicao';
import { criarDescricao } from '@/api/previsao';
import { DescricaoClienteDTO } from '@/models/descricao';

import { stylesDescricao } from '@/styles/screens/DescricaoCliente';


/* ------------------------ COMPONENTES REUTILIZÁVEIS ------------------------ */
const InputBase = ({ children }: any) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        stylesDescricao.inputWrapper,
        { borderColor: theme.colors.border },
      ]}
    >
      {children}
    </View>
  );
};

const CampoNumerico = ({ label, value, onChangeText, placeholder }: any) => {
  const { theme } = useTheme();
  return (
    <>
      <Text style={[stylesDescricao.label, { color: theme.colors.text }]}>
        {label}
      </Text>

      <InputBase>
        <TextInput
          keyboardType="numeric"
          value={value != null ? String(value) : ''}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.mutedText}
          style={[
            stylesDescricao.input,
            { color: theme.colors.text },
          ]}
        />
      </InputBase>
    </>
  );
};

const CampoPicker = ({ label, selected, onChange, opcoes }: any) => {
  const { theme } = useTheme();
  return (
    <>
      <Text style={[stylesDescricao.label, { color: theme.colors.text }]}>
        {label}
      </Text>

      <View
        style={[
          stylesDescricao.pickerWrapper,
          { borderColor: theme.colors.border },
        ]}
      >
        <Picker selectedValue={selected} onValueChange={v => onChange(v || null)}>
          <Picker.Item label={`Selecione ${label.toLowerCase()}`} value={null} />
          {opcoes.map(o => (
            <Picker.Item key={o.id} label={o.nome} value={o.id} />
          ))}
        </Picker>
      </View>
    </>
  );
};


/* ------------------------ FORMULÁRIO PRINCIPAL ------------------------ */
export default function DescricaoClienteForm() {
  const { theme } = useTheme();
  const { user } = useSession() as any;

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  const [form, setForm] = useState<DescricaoClienteDTO>({
    idUsuario: user?.idUsuario ?? 0,
    idOcupacao: null,
    idCampoEstudo: null,
    idNivelEducacional: null,
    idInfluenciaFamiliar: null,
    qtdaAnosExperiencia: null,
    dsSatisfacao: null,
    dsTecnologia: null,
    dsMudanca: null,
    nrSalario: null,
    nrIdade: null,
  });

  const update = (field: keyof DescricaoClienteDTO, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const num = (t: string) => {
    const n = Number(t.replace(/\D/g, ''));
    return isNaN(n) ? null : n;
  };

  const numFloat = (t: string) => {
    const n = Number(t.replace(',', '.'));
    return isNaN(n) ? null : n;
  };

  const validate = () => {
    const obrigatorios = [
      'idOcupacao',
      'idCampoEstudo',
      'idNivelEducacional',
      'idInfluenciaFamiliar',
    ];

    for (let campo of obrigatorios) {
      // @ts-ignore
      if (!form[campo]) {
        Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setResultado(null);

      const payload = { ...form, idUsuario: user.idUsuario };

      await criarDescricao(payload);

      const resPred = await predizerMudanca(payload);
      setResultado(resPred);

      Alert.alert('Sucesso', 'Previsão gerada!');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao enviar dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={stylesDescricao.screen}
      >
        <ScrollView contentContainerStyle={stylesDescricao.scroll}>
          <Text
            style={[
              stylesDescricao.title,
              { color: theme.colors.text },
            ]}
          >
            Informações para previsão de mudança
          </Text>

          <CampoPicker
            label="Ocupação"
            selected={form.idOcupacao}
            onChange={v => update('idOcupacao', v)}
            opcoes={OPCOES_OCUPACAO}
          />

          <CampoPicker
            label="Campo de estudo"
            selected={form.idCampoEstudo}
            onChange={v => update('idCampoEstudo', v)}
            opcoes={OPCOES_CAMPO_ESTUDO}
          />

          <CampoPicker
            label="Nível educacional"
            selected={form.idNivelEducacional}
            onChange={v => update('idNivelEducacional', v)}
            opcoes={OPCOES_NIVEL_EDUCACIONAL}
          />

          <CampoPicker
            label="Influência familiar"
            selected={form.idInfluenciaFamiliar}
            onChange={v => update('idInfluenciaFamiliar', v)}
            opcoes={OPCOES_INFLUENCIA_FAMILIAR}
          />

          <CampoNumerico
            label="Idade*"
            value={form.nrIdade}
            placeholder="Ex.: 25"
            onChangeText={t => update('nrIdade', num(t))}
          />

          <CampoNumerico
            label="Anos de experiência*"
            value={form.qtdaAnosExperiencia}
            placeholder="Ex.: 3"
            onChangeText={t => update('qtdaAnosExperiencia', num(t))}
          />

          <CampoNumerico
            label="Salário atual (R$)*"
            value={form.nrSalario}
            placeholder="3500,00"
            onChangeText={t => update('nrSalario', numFloat(t))}
          />

          <CampoNumerico
            label="Satisfação (0–99)*"
            value={form.dsSatisfacao}
            placeholder="70"
            onChangeText={t => update('dsSatisfacao', num(t))}
          />

          <CampoNumerico
            label="Tecnologia (0–99)*"
            value={form.dsTecnologia}
            placeholder="80"
            onChangeText={t => update('dsTecnologia', num(t))}
          />

          <CampoNumerico
            label="Vontade de mudar (0–99)*"
            value={form.dsMudanca}
            placeholder="60"
            onChangeText={t => update('dsMudanca', num(t))}
          />

          {resultado && (
            <View
              style={[
                stylesDescricao.resultadoCard,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface,
                },
              ]}
            >
              <Text
                style={[
                  stylesDescricao.resultadoTitle,
                  { color: theme.colors.text },
                ]}
              >
                Resultado da previsão
              </Text>

              <Text style={[stylesDescricao.resultadoText, { color: theme.colors.text }]}>
                Classe: {resultado.classePrevista ?? '—'}
              </Text>

              <Text style={[stylesDescricao.resultadoText, { color: theme.colors.text }]}>
                Probabilidade:{' '}
                {resultado.probabilidadeMudar
                  ? `${(resultado.probabilidadeMudar * 100).toFixed(1)}%`
                  : '—'}
              </Text>
            </View>
          )}

          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit}
            style={[
              stylesDescricao.button,
              {
                backgroundColor: loading
                  ? theme.colors.mutedText
                  : theme.colors.primary,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.primaryText} />
            ) : (
              <Text
                style={[
                  stylesDescricao.buttonText,
                  { color: theme.colors.primaryText },
                ]}
              >
                Enviar e gerar previsão
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
}

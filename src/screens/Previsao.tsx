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

import { predizerMudanca, ResultadoPredicao } from '@/api/predicao';
import { criarDescricao } from '@/api/previsao';
import { DescricaoClienteDTO } from '@/models/descricao';

export default function DescricaoClienteForm() {
  const { theme } = useTheme();
  const { user } = useSession() as any;

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<ResultadoPredicao | null>(null);

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
    dtInput: undefined,
  });

  const handleChange = (field: keyof DescricaoClienteDTO, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const parseIntField = (text: string): number | null => {
    const clean = text.replace(/\D/g, '');
    if (!clean) return null;
    return Number(clean);
  };

  const parseFloatField = (text: string): number | null => {
    const clean = text.replace(',', '.').replace(/[^0-9.]/g, '');
    if (!clean) return null;
    const num = Number(clean);
    return Number.isNaN(num) ? null : num;
  };

  const validateForm = (): boolean => {
    if (!user?.idUsuario) {
      Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
      return false;
    }

    if (!form.idOcupacao || !form.idCampoEstudo || !form.idNivelEducacional || !form.idInfluenciaFamiliar) {
      Alert.alert(
        'Atenção',
        'Selecione ocupação, campo de estudo, nível educacional e influência familiar.',
      );
      return false;
    }

    if (form.qtdaAnosExperiencia == null) {
      Alert.alert('Atenção', 'Informe a quantidade de anos de experiência.');
      return false;
    }

    if (form.dsSatisfacao == null || form.dsTecnologia == null || form.dsMudanca == null) {
      Alert.alert('Atenção', 'Preencha os campos de satisfação, tecnologia e mudança (0 a 99).');
      return false;
    }

    if (form.nrIdade == null) {
      Alert.alert('Atenção', 'Informe sua idade.');
      return false;
    }

    if (form.nrSalario == null) {
      Alert.alert('Atenção', 'Informe seu salário atual (aproximado).');
      return false;
    }

    if (form.dsSatisfacao < 0 || form.dsSatisfacao > 99) {
      Alert.alert('Atenção', 'Satisfação deve estar entre 0 e 99.');
      return false;
    }
    if (form.dsTecnologia < 0 || form.dsTecnologia > 99) {
      Alert.alert('Atenção', 'Tecnologia deve estar entre 0 e 99.');
      return false;
    }
    if (form.dsMudanca < 0 || form.dsMudanca > 99) {
      Alert.alert('Atenção', 'Mudança deve estar entre 0 e 99.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setResultado(null);

      const payload: DescricaoClienteDTO = {
        ...form,
        idUsuario: user.idUsuario,
        // dtInput: new Date().toISOString(), // se quiser mandar
      };

      // 1) Salva a descrição do cliente
      await criarDescricao(payload);

      // 2) Chama IA de predição com o mesmo DTO
      const resPred = await predizerMudanca(payload);
      console.log('[Predição IA]', resPred);
      setResultado(resPred);

      Alert.alert('Sucesso', 'Dados enviados e previsão gerada com sucesso!');
    } catch (err: any) {
      console.error('[DescricaoClienteForm] Erro ao enviar descrição / prever:', err?.response || err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Erro ao enviar os dados ou gerar previsão. Tente novamente.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16, color: theme.colors.text }}>
            Sobre você
          </Text>

          {/* Ocupação */}
          <Text style={{ marginBottom: 4, color: theme.colors.text }}>Ocupação atual*</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Picker
              selectedValue={form.idOcupacao}
              onValueChange={value => handleChange('idOcupacao', value || null)}
            >
              <Picker.Item label="Selecione sua ocupação" value={null} />
              {OPCOES_OCUPACAO.map(op => (
                <Picker.Item key={op.id} label={op.nome} value={op.id} />
              ))}
            </Picker>
          </View>


          {/* Campo de Estudo */}
          <Text style={{ marginBottom: 4, color: theme.colors.text }}>Campo de estudo*</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Picker
              selectedValue={form.idCampoEstudo}
              onValueChange={value => handleChange('idCampoEstudo', value || null)}
            >
              <Picker.Item label="Selecione seu campo de estudo" value={null} />
              {OPCOES_CAMPO_ESTUDO.map(c => (
                <Picker.Item key={c.id} label={c.nome} value={c.id} />
              ))}
            </Picker>
          </View>

          {/* Nível Educacional */}
          <Text style={{ marginBottom: 4, color: theme.colors.text }}>Nível educacional*</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Picker
              selectedValue={form.idNivelEducacional}
              onValueChange={value => handleChange('idNivelEducacional', value || null)}
            >
              <Picker.Item label="Selecione seu nível de escolaridade" value={null} />
              {OPCOES_NIVEL_EDUCACIONAL.map(n => (
                <Picker.Item key={n.id} label={n.nome} value={n.id} />
              ))}
            </Picker>
          </View>

          {/* Influência Familiar */}
          <Text style={{ marginBottom: 4, color: theme.colors.text }}>
            Influência familiar na carreira*
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Picker
              selectedValue={form.idInfluenciaFamiliar}
              onValueChange={value => handleChange('idInfluenciaFamiliar', value || null)}
            >
              <Picker.Item label="Selecione uma opção" value={null} />
              {OPCOES_INFLUENCIA_FAMILIAR.map(i => (
                <Picker.Item key={i.id} label={i.nome} value={i.id} />
              ))}
            </Picker>
          </View>

          {/* Idade */}
          <Text style={{ marginBottom: 4, color: theme.colors.text }}>Idade*</Text>
          <TextInput
            keyboardType="numeric"
            value={form.nrIdade != null ? String(form.nrIdade) : ''}
            onChangeText={text => handleChange('nrIdade', parseIntField(text))}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              padding: 10,
              marginBottom: 12,
              color: theme.colors.text,
            }}
            placeholder="Ex.: 25"
            placeholderTextColor={theme.colors.muted}
          />

          {/* Anos de experiência */}
          <Text style={{ marginBottom: 4, color: theme.colors.text }}>
            Anos de experiência na área atual*
          </Text>
          <TextInput
            keyboardType="numeric"
            value={form.qtdaAnosExperiencia != null ? String(form.qtdaAnosExperiencia) : ''}
            onChangeText={text => handleChange('qtdaAnosExperiencia', parseIntField(text))}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              padding: 10,
              marginBottom: 12,
              color: theme.colors.text,
            }}
            placeholder="Ex.: 3"
            placeholderTextColor={theme.colors.muted}
          />

          {/* Salário */}
          <Text style={{ marginBottom: 4, color: theme.colors.text }}>
            Salário atual (aproximado)* — R$
          </Text>
          <TextInput
            keyboardType="numeric"
            value={form.nrSalario != null ? String(form.nrSalario) : ''}
            onChangeText={text => handleChange('nrSalario', parseFloatField(text))}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              padding: 10,
              marginBottom: 12,
              color: theme.colors.text,
            }}
            placeholder="Ex.: 3500,00"
            placeholderTextColor={theme.colors.muted}
          />

          {/* Satisfação, Tecnologia, Mudança */}
          <Text style={{ marginBottom: 4, color: theme.colors.text }}>
            Nível de satisfação com o trabalho atual (0 a 99)*
          </Text>
          <TextInput
            keyboardType="numeric"
            value={form.dsSatisfacao != null ? String(form.dsSatisfacao) : ''}
            onChangeText={text => handleChange('dsSatisfacao', parseIntField(text))}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              padding: 10,
              marginBottom: 12,
              color: theme.colors.text,
            }}
            placeholder="Ex.: 70"
            placeholderTextColor={theme.colors.muted}
          />

          <Text style={{ marginBottom: 4, color: theme.colors.text }}>
            Quanto a tecnologia faz parte do seu dia a dia (0 a 99)?*
          </Text>
          <TextInput
            keyboardType="numeric"
            value={form.dsTecnologia != null ? String(form.dsTecnologia) : ''}
            onChangeText={text => handleChange('dsTecnologia', parseIntField(text))}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              padding: 10,
              marginBottom: 12,
              color: theme.colors.text,
            }}
            placeholder="Ex.: 80"
            placeholderTextColor={theme.colors.muted}
          />

          <Text style={{ marginBottom: 4, color: theme.colors.text }}>
            Vontade de mudar de carreira (0 a 99)* — quanto maior, maior a vontade
          </Text>
          <TextInput
            keyboardType="numeric"
            value={form.dsMudanca != null ? String(form.dsMudanca) : ''}
            onChangeText={text => handleChange('dsMudanca', parseIntField(text))}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              padding: 10,
              marginBottom: 20,
              color: theme.colors.text,
            }}
            placeholder="Ex.: 60"
            placeholderTextColor={theme.colors.muted}
          />

          {/* Resultado da IA */}
          {resultado && (
            <View
              style={{
                marginBottom: 20,
                padding: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Resultado da previsão
              </Text>
              <Text style={{ color: theme.colors.text }}>
                Classe prevista:{' '}
                <Text style={{ fontWeight: '600' }}>
                  {resultado.classePrevista ?? '—'}
                </Text>
              </Text>
              <Text style={{ color: theme.colors.text, marginTop: 4 }}>
                Probabilidade de mudança:{' '}
                <Text style={{ fontWeight: '600' }}>
                  {resultado.probabilidadeMudar != null
                    ? `${(resultado.probabilidadeMudar * 100).toFixed(1)}%`
                    : '—'}
                </Text>
              </Text>
            </View>
          )}

          {/* Botão enviar */}
          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit}
            style={{
              backgroundColor: loading ? theme.colors.muted : theme.colors.primary,
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                Enviar e gerar previsão
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
}

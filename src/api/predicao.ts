// src/api/predicao.ts

import apiClient from '@/api/apiClient';
import { DescricaoClienteDTO } from '@/models/descricao';

export interface ResultadoPredicao {
  classePrevista: number | null;       // no back é Integer
  probabilidadeMudar: number | null;   // no back é Double (0–1)
}

// A API espera um DescricaoClienteDTO no corpo
export async function predizerMudanca(dto: DescricaoClienteDTO): Promise<ResultadoPredicao> {
  const response = await apiClient.post<ResultadoPredicao>(
    '/api/predicoes/predizer',
    dto,
  );
  return response.data;
}

export default {
  predizerMudanca,
};

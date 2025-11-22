// src/api/descricao.ts

import apiClient from '@/api/apiClient';
import type { CampoEstudo } from '@/models/campoEstudo';
import { DescricaoClienteDTO } from '@/models/descricao';
import type { InfluenciaFamiliar } from '@/models/influenciaFamiliar';
import type { NivelEducacional } from '@/models/nivelEducacional';
import type { Ocupacao } from '@/models/ocupacao';
import type { Usuario } from '@/models/usuario';

// 🔹 Model para o que volta do backend em /descricao-clientes
// (ajusta se seu model tiver mais/menos campos)
export interface DescricaoCliente {
  idDescricao: number;
  usuario: Usuario;
  ocupacao: Ocupacao;
  campoEstudo: CampoEstudo;
  nivelEducacional: NivelEducacional;
  influenciaFamiliar: InfluenciaFamiliar;

  qtdaAnosExperiencia: number | null;
  dsSatisfacao: number | null;
  dsTecnologia: number | null;
  dsMudanca: number | null;
  nrSalario: number | null;
  nrIdade: number | null;
  dsOcupacao?: string | null;
  dtInput: string | null;
}

const BASE_PATH = '/api/descricao-clientes'; // baseURL já deve ter /api

// GET /descricao-clientes/todos
export async function getDescricoes(): Promise<DescricaoCliente[]> {
  const response = await apiClient.get<DescricaoCliente[]>(`${BASE_PATH}/todos`);
  return response.data;
}

// GET /descricao-clientes/{id}
export async function getDescricaoById(idDescricao: number): Promise<DescricaoCliente> {
  const response = await apiClient.get<DescricaoCliente>(`${BASE_PATH}/${idDescricao}`);
  return response.data;
}

// POST /descricao-clientes/inserir
export async function criarDescricao(dto: DescricaoClienteDTO): Promise<DescricaoCliente> {
  const response = await apiClient.post<DescricaoCliente>(`${BASE_PATH}/inserir`, dto);
  return response.data;
}

// GET /descricao-clientes/historico_cliente (usuário autenticado)
export async function getHistoricoDescricaoCliente(): Promise<DescricaoCliente[]> {
  const response = await apiClient.get<DescricaoCliente[]>(`${BASE_PATH}/historico_cliente`);
  return response.data;
}

// opcional: export default agrupado
export default {
  getDescricoes,
  getDescricaoById,
  criarDescricao,
  getHistoricoDescricaoCliente,
};

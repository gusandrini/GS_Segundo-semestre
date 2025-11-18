import { Usuario } from "../models/usuario";
import apiClient from "./apiClient";

// Criar
export function addUsuario(usuario: Omit<Usuario, "idUsuario">) {
  // backend ignora idUsuario na criação, então é opcional
  return apiClient.post<Usuario>("/usuarios/inserir", usuario);
}

// Listar todos
export function getUsuarios() {
  return apiClient.get<Usuario[]>("/usuarios/todos");
}

// Buscar por ID
export function getUsuario(id: number | string) {
  return apiClient.get<Usuario>(`/usuarios/${id}`);
}

// Atualizar
export function updateUsuario(usuario: Usuario) {
  if (!usuario.idUsuario) {
    throw new Error("idUsuario é obrigatório para atualizar o usuário");
  }

  return apiClient.put<Usuario>(
    `/usuarios/atualizar/${usuario.idUsuario}`,
    usuario
  );
}

// Excluir
export function deleteUsuario(id: number | string) {
  return apiClient.delete(`/usuarios/remover/${id}`);
}

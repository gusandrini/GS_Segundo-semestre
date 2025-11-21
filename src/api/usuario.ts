import { Usuario } from "../models/usuario";
import apiClient from "./apiClient";

// Criar
export function addUsuario(usuario: Omit<Usuario, "idUsuario">) {
  // backend ignora idUsuario na criação, então é opcional
  return apiClient.post<Usuario>("/api/usuarios/inserir", usuario);
}

// Listar todos
export function getUsuarios() {
  return apiClient.get<Usuario[]>("/api/usuarios/todos_usuarios");
}

// Buscar por ID
export function getUsuario(id: number | string) {
  return apiClient.get<Usuario>(`/api/usuarios/${id}`);
}

// Atualizar
export function updateUsuario(usuario: Usuario) {
  if (!usuario.idUsuario) {
    throw new Error("idUsuario é obrigatório para atualizar o usuário");
  }

  return apiClient.put<Usuario>(
    `/api/usuarios/atualizar/${usuario.idUsuario}`,
    usuario
  );
}

// Excluir
export function deleteUsuario(id: number | string) {
  return apiClient.delete(`/api/usuarios/remover/${id}`);
}

import type { Cliente } from '@/types/cliente';

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Retorna diretamente o Cliente (ou troque para { data: Cliente } se preferir)
export async function getCliente(userId: string): Promise<Cliente> {
  await wait(500);
  return {
    id: userId,
    nome: 'João da Silva',
    emailCorporativo: 'joao.silva@empresa.com',
    cargo: 'Analista de Sistemas',
  };
}

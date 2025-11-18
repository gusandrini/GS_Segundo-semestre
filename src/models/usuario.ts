export interface Usuario {
  idUsuario?: number;     
  nmCliente: string;      
  nmEmail: string;       
  nmSenha: string;
  funcoes?: Funcao[];     
}

export interface Funcao {
  idFuncao: number;
  nmFuncao: string;
}
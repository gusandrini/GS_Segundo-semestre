// src/models/ocupacao.ts
export interface Ocupacao {
  idOcupacao: number;
  nmOcupacao: string;
}

// src/models/campoEstudo.ts
export interface CampoEstudo {
  idCampoEstudo: number;
  nmCampoEstudo: string;
}

// src/models/nivelEducacional.ts
export interface NivelEducacional {
  idNivelEducacional: number;
  nmNivelEducacional: string;
}

// src/models/influenciaFamiliar.ts
export interface InfluenciaFamiliar {
  idInfluenciaFamiliar: number;
  nmInfluenciaFamiliar: string;
}

// src/models/descricao.ts
export interface DescricaoClienteDTO {
  idDescricao?: number;
  idUsuario: number;

  idOcupacao: number | null;
  idCampoEstudo: number | null;
  idNivelEducacional: number | null;
  idInfluenciaFamiliar: number | null;

  dsOcupacao?: string | null;

  qtdaAnosExperiencia: number | null;
  dsSatisfacao: number | null;
  dsTecnologia: number | null;
  dsMudanca: number | null;

  nrSalario: number | null;
  nrIdade: number | null;

  dtInput?: string | null;
}

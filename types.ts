export interface FormData {
  name: string;
  isClient: boolean;
  preferredPeriods: string[];
  preferredWeekDays: string[];
  wantsSpecificDate: boolean;
  specificDate: string;
  procedure: string[];
}

export enum ProcedureCategory {
  LASH = 'Lash',
  BROWS = 'Design de Sobrancelhas',
  SKIN = 'Limpeza de Pele',
  BOTOX = 'Botox Day',
  NANO = 'Nanopigmentação',
}

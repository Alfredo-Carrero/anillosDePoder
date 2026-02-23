export interface JuegoDTO {
  id: number;
  pregunta: string;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4: string;
}

export interface PartidaDTO {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  numeroCorrectas: number;
  finPartida: boolean;
}

export interface Estadisticas {
  jugadas: number;
  victorias: number;
  derrotas: number;
}

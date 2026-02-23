import { Injectable } from '@angular/core';
import { Estadisticas } from '../models/juego.model';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private readonly STORAGE_KEY = 'estadisticas_esdla';

  obtenerEstadisticas(): Estadisticas {
    const stats = localStorage.getItem(this.STORAGE_KEY);
    if (stats) {
      return JSON.parse(stats);
    }
    // Valores por defecto si es la primera vez que jugamos
    return { jugadas: 0, victorias: 0, derrotas: 0 };
  }

  registrarVictoria(): void {
    const stats = this.obtenerEstadisticas();
    stats.jugadas++;
    stats.victorias++;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
  }

  registrarDerrota(): void {
    const stats = this.obtenerEstadisticas();
    stats.jugadas++;
    stats.derrotas++;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
  }
}

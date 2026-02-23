import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { EstadisticasService } from '../servicios/estadisticas-service';
import { Estadisticas } from '../models/juego.model';

@Component({
  selector: 'app-estadisticas',

  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css'
})
export class EstadisticasComponent implements OnInit {

  estadisticas: Estadisticas = { jugadas: 0, victorias: 0, derrotas: 0 };
  porcentajeVictorias: number = 0;

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.estadisticas = this.estadisticasService.obtenerEstadisticas();

    if (this.estadisticas.jugadas > 0) {
      this.porcentajeVictorias = Math.round((this.estadisticas.victorias / this.estadisticas.jugadas) * 100);
    } else {
      this.porcentajeVictorias = 0;
    }
  }

  limpiarEstadisticas() {

    localStorage.removeItem('estadisticas_esdla');
    this.cargarEstadisticas();
  }
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Raza } from '../../interfaces/raza';
import { Razas } from '../../clases/razas';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busqueda-razas',
  imports: [TableModule, InputTextModule, FormsModule, ButtonModule, CommonModule],
  templateUrl: './busqueda-razas.html',
  styleUrl: './busqueda-razas.css',
})
export class BusquedaRazas {
  raza = new Razas();

  razasFiltradas: Raza[] = this.raza.razas;
  campoBusquedaRazas: string = '';

  buscarRaza() {
    const t = this.campoBusquedaRazas.toLowerCase();

    this.razasFiltradas = this.raza.razas.filter(
      (r) =>
        r.nombre.toLowerCase().includes(t) ||
        r.descripcion.toLowerCase().includes(t) ||
        r.longevidad.toLowerCase().includes(t) ||
        r.regionPrincipal.toLowerCase().includes(t)
    );
  }
}

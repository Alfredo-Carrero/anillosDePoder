import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import { BusquedaRazas } from './busquedaRaza/busqueda-razas/busqueda-razas';

export const routes: Routes = [
  { path: 'detalle', component: Detalle },
  { path: 'buscar', component: Busqueda },
  { path: 'razas', component: BusquedaRazas },
];

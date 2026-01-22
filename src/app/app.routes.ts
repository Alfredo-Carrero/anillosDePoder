import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import { BusquedaRazas } from './busquedaRaza/busqueda-razas/busqueda-razas';
import { DetalleAnillo } from './anillo/detalleAnillo/detalle-anillo/detalle-anillo';
import { BuscarPersonaje } from './personajes/buscar-personaje/buscar-personaje';
import { DetallePersonaje } from './personajes/detalle-personaje/detalle-personaje';

export const routes: Routes = [
  { path: 'detalle', component: Detalle },
  { path: 'buscar', component: Busqueda },
  { path: 'razas', component: BusquedaRazas },
  { path: 'detalleAnillo', component: DetalleAnillo },
  { path: 'personajes', component: BuscarPersonaje },
  { path: 'editar/:id', component: DetallePersonaje },
  { path: 'crearPersonaje', component: DetallePersonaje },
];

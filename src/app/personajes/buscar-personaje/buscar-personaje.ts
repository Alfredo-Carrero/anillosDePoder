import { ChangeDetectorRef, Component } from '@angular/core';
import { PersonajesService } from '../../servicios/personajes-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PersonajeService } from '../../servicios/personaje-service';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { ConfirmarPopup } from '../../modales/confirmar-popup/confirmar-popup';
@Component({
  selector: 'app-buscar-personaje',
  imports: [ButtonModule, TableModule, RouterLink, CommonModule],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje {
  constructor(
    private personajesService: PersonajesService,
    private personajeService: PersonajeService,
    private router: Router,
    public route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  personajes: any[] = [];
  error = '';
  @ViewChild(ConfirmarPopup) popup!: ConfirmarPopup;

  editar(id: number) {
    // alert(id);
    this.router.navigate(['/editar', id]);
  }

  crearPersonaje(): void {
    this.router.navigate(['/crearPersonaje']);
  }

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    this.personajesService.getAllPersonajes().subscribe({
      next: (data) => {
        this.personajes = data;
        this.cdr.detectChanges();
        console.log(this.personajes);
      },

      error: (err) => {
        this.error = 'Se ha producido un error en la petición';
      },
    });
  }

  reactivarPersonaje(id: number) {
    this.personajeService.reactivarPersonaje(id).subscribe({
      next: () => {
        alert('¡Personaje reactivado correctamente!');
        this.router.navigate(['/personajes']);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.error = 'No se pudo reactivar el personaje. Inténtalo de nuevo.';
      },
    });
  }

  darBajaLogica(id: number) {
    this.personajeService.bajaLogica(id).subscribe({
      next: () => {
        alert('¡Personaje dado de baja temporal correctamente!');
        this.cargarPersonajes();
      },
      error: (err) => {
        console.error('Error al dar de baja lógica:', err);
        this.error = 'No se pudo dar de baja lógica el personaje. Inténtalo de nuevo.';
      },
    });
  }

  darBajaFisica(id: number) {
    this.personajeService.bajaFisica(id).subscribe({
      next: () => {
        alert('¡Personaje eliminado correctamente!');
        this.cargarPersonajes();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.error = 'No se pudo eliminar el personaje. Inténtalo de nuevo.';
      },
    });
  }
}

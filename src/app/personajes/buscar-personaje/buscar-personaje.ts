import { ChangeDetectorRef, Component } from '@angular/core';
import { PersonajesService } from '../../servicios/personajes-service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-buscar-personaje',
  imports: [ButtonModule, RouterLink],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje {
  constructor(
    private personajesService: PersonajesService,
    private route: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  personajes: any[] = [];
  error = '';

  editar(id: number) {
    // alert(id);
    this.route.navigate(['/editar', id]);
  }

  crearPersonaje(): void {
    this.route.navigate(['/crearPersonaje']);
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
}

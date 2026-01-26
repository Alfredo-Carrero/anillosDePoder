import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PersonajeService } from '../../servicios/personaje-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-detalle-personaje',
  imports: [
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    TextareaModule,
    SelectButtonModule,
    ButtonModule,
    SliderModule,
  ],
  templateUrl: './detalle-personaje.html',
  styleUrl: './detalle-personaje.css',
})
export class DetallePersonaje {
  constructor(
    private personajeService: PersonajeService,
    public route: ActivatedRoute,
    private router: Router,
  ) {}

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(),
    raza: new FormControl(),
    fechaNacimiento: new FormControl(),
    nivelCorrupcion: new FormControl(),
  });
  personaje: any = '';
  error = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recuperarDatos(id);
    }
  }

  recuperarDatos(id: string) {
    this.personajeService.getPersonaje(id).subscribe({
      next: (data) => {
        this.personaje = data;
        this.formulario.patchValue(data); // rellena el formulario
      },

      error: (err) => {
        this.error = 'Se ha producido un error en la petición';
      },
    });
  }

  actualizarPersonaje(id: string) {
    const datosActualizados = this.formulario.value;

    this.personajeService.updatePersonaje(id, datosActualizados).subscribe({
      next: () => {
        alert('¡Personaje actualizado correctamente!');
        this.router.navigate(['/personajes']);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.error = 'No se pudo actualizar el personaje. Inténtalo de nuevo.';
      },
    });
  }

  crearPersonaje() {
    const datos = this.formulario.value;
    this.personajeService.createPersonaje(datos).subscribe({
      next: () => {
        alert('Personaje creado correctamente');
        this.router.navigate(['/personajes']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al crear el personaje';
      },
    });
  }

  guardar() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.actualizarPersonaje(id);
    } else {
      this.crearPersonaje();
    }
  }
}

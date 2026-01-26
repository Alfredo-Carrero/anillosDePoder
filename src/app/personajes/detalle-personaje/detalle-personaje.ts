import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
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
    this.recuperarDatos(id || '');
  }

  recuperarDatos(id: string) {
    this.personajeService.getPersonaje(id).subscribe({
      next: (data) => {
        this.personaje = data;
        this.formulario.get('nombre')?.setValue(this.personaje.nombre);
        this.formulario.get('raza')?.setValue(this.personaje.raza);
        this.formulario.get('fechaNacimiento')?.setValue(this.personaje.fechaNacimiento);
        this.formulario.get('nivelCorrupcion')?.setValue(this.personaje.nivelCorrupcion);
      },

      error: (err) => {
        this.error = 'Se ha producido un error en la petición';
      },
    });
  }
}

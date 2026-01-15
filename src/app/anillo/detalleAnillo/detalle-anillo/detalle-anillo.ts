import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Slider, SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-detalle-anillo',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    TextareaModule,
    SelectButtonModule,
    ButtonModule,
    SliderModule,
  ],
  templateUrl: './detalle-anillo.html',
  styleUrl: './detalle-anillo.css',
})
export class DetalleAnillo {
  // options para el html
  opcionesRaza = ['Elfo', 'Enano', 'Humano', 'Maiar', 'Oscuro'];

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(10)]),
    portador: new FormControl('', [Validators.required, Validators.minLength(3)]),
    raza: new FormControl('', [Validators.required]),
    poder: new FormControl('', [Validators.required, Validators.minLength(10)]),
    nivelCorrupcion: new FormControl(50, [Validators.min(0), Validators.max(100)]),
  });

  enviar() {
    alert('Formulario enviado');
  }

  // reset
}

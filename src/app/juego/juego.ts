import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { JuegoService } from '../servicios/juego-service';
import { EstadisticasService } from '../servicios/estadisticas-service';
import { JuegoDTO, PartidaDTO } from '../models/juego.model';

@Component({
  selector: 'app-juego',
  imports: [CommonModule, ButtonModule, CardModule, RouterLink],
  templateUrl: './juego.html',
  styleUrl: './juego.css',
})
export class JuegoComponent {
  estado: 'inicio' | 'jugando' | 'ganado' | 'perdido' = 'inicio';
  partidaActual: PartidaDTO | null = null;
  preguntaActual: JuegoDTO | null = null;

  preguntasJugadas: number[] = [];
  aciertos: number = 0;

  constructor(
    private juegoService: JuegoService,
    private estadisticasService: EstadisticasService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  empezarPartida() {
    this.juegoService.empezarPartida().subscribe({
      next: (partida) => {
        this.partidaActual = partida;
        this.estado = 'jugando';
        this.preguntasJugadas = [];
        this.aciertos = 0;
        this.cargarSiguientePregunta();
      },
      error: (err) => {
        console.error('Error al empezar partida:', err);
      },
    });
  }

  cargarSiguientePregunta() {
    let idAleatorio: number;

    do {
      idAleatorio = Math.floor(Math.random() * 30) + 1;
    } while (this.preguntasJugadas.includes(idAleatorio));

    this.preguntasJugadas.push(idAleatorio);

    this.juegoService.obtenerPregunta(idAleatorio).subscribe({
      next: (pregunta) => {
        this.preguntaActual = pregunta;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener pregunta:', err);
      },
    });
  }

  responder(respuestaUsuario: number) {
    if (!this.preguntaActual || !this.partidaActual) return;

    const idPregunta = this.preguntaActual.id;
    const idPartida = this.partidaActual.id;

    this.juegoService.comprobarRespuesta(idPregunta, respuestaUsuario).subscribe({
      next: (esCorrecta) => {
        if (esCorrecta) {
          this.juegoService.actualizarCorrectas(idPartida).subscribe((partidaActualizada) => {
            this.aciertos = partidaActualizada.numeroCorrectas;

            if (this.aciertos === 5) {
              this.gestionarVictoria(idPartida);
            } else {
              this.cargarSiguientePregunta();
            }
          });
        } else {
          this.gestionarDerrota(idPartida);
        }
      },
      error: (err) => {
        console.error('Error al comprobar respuesta:', err);
      },
    });
  }

  private gestionarVictoria(idPartida: number) {
    this.juegoService.finalizarPartida(idPartida).subscribe(() => {
      this.estadisticasService.registrarVictoria();
      this.estado = 'ganado';
      this.cdr.detectChanges();
    });
  }

  private gestionarDerrota(idPartida: number) {
    this.juegoService.finalizarPartida(idPartida).subscribe(() => {
      this.estadisticasService.registrarDerrota();
      this.estado = 'perdido';
      this.cdr.detectChanges();
    });
  }
}

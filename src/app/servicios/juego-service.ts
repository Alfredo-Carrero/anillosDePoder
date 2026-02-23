import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JuegoDTO, PartidaDTO } from '../models/juego.model'; // Ajusta la ruta

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = environment.apiESDLA;

  constructor(private http: HttpClient) {}

  empezarPartida(): Observable<PartidaDTO> {
    return this.http.get<PartidaDTO>(`${this.apiUrl}empezarPartida/`);
  }

  obtenerPregunta(id: number): Observable<JuegoDTO> {
    return this.http.get<JuegoDTO>(`${this.apiUrl}obtenerPregunta/${id}`);
  }

  comprobarRespuesta(idPregunta: number, respuestaUsuario: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}respuesta/${idPregunta}/?respuestaUsuario=${respuestaUsuario}`);
  }

  actualizarCorrectas(idPartida: number): Observable<PartidaDTO> {
    return this.http.put<PartidaDTO>(`${this.apiUrl}correcta/${idPartida}/`, {});
  }

  finalizarPartida(idPartida: number): Observable<PartidaDTO> {
    return this.http.put<PartidaDTO>(`${this.apiUrl}finalizar/${idPartida}/`, {});
  }
}

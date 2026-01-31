import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonajeService {
  constructor(private http: HttpClient) {}

  private apiESDLA = environment.apiESDLA;

  getPersonaje(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiESDLA}obtenerPersonaje/${id}`);
  }

  updatePersonaje(id: string, datosActualizados: any): Observable<any> {
    return this.http.put<any>(`${this.apiESDLA}actualizarPersonaje/${id}`, datosActualizados);
  }

  createPersonaje(datos: any): Observable<any> {
    return this.http.post<any>(`${this.apiESDLA}insertarPersonaje`, datos);
  }

  bajaLogica(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiESDLA}bajaLogica/${id}`, {});
  }

  reactivarPersonaje(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiESDLA}reactivar/${id}`, {});
  }

  bajaFisica(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiESDLA}bajaFisica/${id}`);
  }
}

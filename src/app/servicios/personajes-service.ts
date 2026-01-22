import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  constructor(private http: HttpClient) {}

  private apiESDLA = environment.apiESDLA;

  getAllPersonajes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiESDLA}listaPersonajes`);
  }
}

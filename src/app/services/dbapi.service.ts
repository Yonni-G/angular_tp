import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const API_DB_BASE = environment.db_api;

const headers = new HttpHeaders({
  'Content-Type': 'application/json', // Indiquer que les données sont en JSON
});

@Injectable({
  providedIn: 'root',
})
export class DbapiService {
  private readonly http: HttpClient = inject(HttpClient);

  fetchRegister(user: User): Observable<any> {
    return this.http.post<any>(`${API_DB_BASE}/register`, user, { headers });
  }

  fetchLogin(user: User): Observable<any> {
    return this.http.post<any>(`${API_DB_BASE}/login`, user, { headers });
  }
}

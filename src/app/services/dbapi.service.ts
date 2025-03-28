import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const API_DB_BASE = environment.db_api;


@Injectable({
  providedIn: 'root',
})
export class DbapiService {
  private readonly http: HttpClient = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Récupère le token
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  fetchRegister(user: User): Observable<any> {
    return this.http.post<any>(`${API_DB_BASE}/register`, user, {
      headers: this.getHeaders(),
    });
  }

  fetchLogin(user: User): Observable<any> {
    return this.http.post<any>(`${API_DB_BASE}/login`, user, {
      headers: this.getHeaders(),
    });
  }

  fetchGetUser() {
    return this.http.get<any>(`${API_DB_BASE}/user`, {
      headers: this.getHeaders()
    });
  }

}

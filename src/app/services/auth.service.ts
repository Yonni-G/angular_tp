import { inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { DbapiService } from './dbapi.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  private readonly usernameSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  public token$: Observable<string | null> = this.tokenSubject.asObservable();
  public username$: Observable<string | null> =
    this.usernameSubject.asObservable();

  private readonly dbapiService = inject(DbapiService);
  private readonly router = inject(Router);

  constructor() {
    this.loadToken(); // Charger le jeton au démarrage pour garder l'état d'authentification
  }

  // Méthode pour stocker le jeton et notifier les abonnés
  storeToken(token: string, username: string): void {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token); // Met à jour le Subject avec le nouveau jeton
    this.usernameSubject.next(username); // Met à jour le Subject avec le nouveau jeton
  }

  // Méthode pour récupérer le jeton du localStorage et mettre à jour le Subject
  loadToken(): void {
    const token = localStorage.getItem('authToken');
    this.tokenSubject.next(token); // Met à jour le Subject avec le jeton récupéré
    
  }

  // Méthode pour supprimer le jeton et notifier les abonnés
  removeToken(): void {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null); // Met à jour le Subject avec null (déconnexion)
    this.usernameSubject.next(null);
  }

  // Méthode pour vérifier si l'utilisateur est authentifié (en fonction de la présence du jeton)
  isAuthenticated(): Observable<boolean> {
    return this.token$.pipe(map((token) => !!token)); // Si un token est présent, renvoie true
  }

  // Méthode pour ajouter un utilisateur (enregistrement)
  addUser(user: User): Observable<any> {
    return this.dbapiService.fetchRegister(user);
  }
  
  getUser(): Observable<any> {
    return this.dbapiService.fetchGetUser();
  }

  // Méthode pour connecter l'utilisateur et stocker le jeton
  login(user: User): Observable<any> {
    return this.dbapiService.fetchLogin(user).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.storeToken(response.token, response.username); // Stocke le jeton JWT après une connexion réussie
        }
        return response;
      })
    );
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    this.removeToken(); // Supprimer le jeton
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}

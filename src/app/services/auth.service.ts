import { inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Mise en place de la logique d'authentification
  // Cookie, Session, Token : Observable

  private readonly isLoggedIn = signal<boolean>(false);
  private readonly route: Router = inject(Router);

  createUser(user: User) {
    // Sauvegarde l'utilisateur dans le localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }

  checkUser(user: User): boolean {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const parsedUser: User = JSON.parse(localUser);
      if (parsedUser.username) {
        if (parsedUser.username === user.username) {
          this.isLoggedIn.set(true);
          // on cree une session utilisateur
          sessionStorage.setItem('username', parsedUser.username)
          return true;
        }
      }
    }
    return false;
  }

  loggout() {
    this.isLoggedIn.set(false);
    sessionStorage.removeItem('username')
    this.route.navigate(['/login']);

  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('username')
  }
}

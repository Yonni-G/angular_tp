import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  private readonly tokenSubscription: Subscription;

  // Injection du service AuthService
  private readonly authService = inject(AuthService);

  constructor() {
    // Souscription à l'observable token$ lors de l'initialisation du composant
    this.tokenSubscription = this.authService.token$.subscribe((token) => {
      this.isAuthenticated = !!token; // Si le token est présent, l'utilisateur est authentifié
    });
  }

  logout() {
    this.authService.logout();
  }
}

import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  private readonly authService: AuthService = inject(AuthService);
  user: any; // Déclare une variable pour stocker les informations de l'utilisateur
  isLoading: boolean = true; // Variable pour gérer l'état de chargement

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user; // Assigne les informations de l'utilisateur
        this.isLoading = false; // Arrête le chargement
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false; // Arrête le chargement en cas d'erreur
      },
    });
  }
}

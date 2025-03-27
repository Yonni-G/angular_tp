import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  name?: string;
  username?: string;
  password?: string;

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService)

  checkRegistration() {
    if (this.name && this.username && this.password) {
      // On va sauver notre utilisateur
      const user: User = {
        name: this.name,
        username: this.username,
        password: this.password,
      };

      this.authService.createUser(user)      

      // Ensuite, on va l'orienter vers le formulaire de connexion
      this.router.navigate(['/login']);
    } else alert('Un des champs est manquant');
  }
}

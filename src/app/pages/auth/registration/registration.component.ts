import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  message: string | null = null;

  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);
  private readonly messageService: MessageService = inject(MessageService);

  registrationForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(5)]),

    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  onSubmit() {
 
    if (this.registrationForm.valid) {
      const user = {
        name: this.registrationForm.get('name')?.value || '',
        username: this.registrationForm.get('username')?.value || '',
        password: this.registrationForm.get('password')?.value || '',
      };

      this.authService.createUser(user);

      // Ensuite, on va l'orienter vers le formulaire de connexion
      this.router.navigate(['/login']);
    }
  }
  /*
  checkRegistration() {
    if (this.name && this.username && this.password) {
      // On va sauver notre utilisateur
      const user: User = {
        name: this.name,
        username: this.username,
        password: this.password,
      };

      this.authService.createUser(user);

      // Ensuite, on va l'orienter vers le formulaire de connexion
      this.router.navigate(['/login']);
    } else alert('Un des champs est manquant');
  }*/
}

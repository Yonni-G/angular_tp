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
import { User } from '../../../models/user';

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
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),

    email: new FormControl(null, [
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
      const user: User = {
        username: this.registrationForm.get('username')?.value || '',
        email: this.registrationForm.get('email')?.value || '',
        password: this.registrationForm.get('password')?.value || '',
      };

      this.authService.addUser(user).subscribe({
        next: (response) => {
          // Si l'enregistrement est réussi, rediriger vers la page de connexion
          console.log(response.message);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Gérer les erreurs (ex: utilisateur déjà existant, erreurs serveur, etc.)
          //console.error("Erreur lors de l'enregistrement:", error);
          this.messageService.setMessage(
            error.error.message || 'Une erreur est survenue'
          );
        },
      });
    } else {
      // Si le formulaire est invalide, afficher un message d'erreur
      this.messageService.setMessage(
        'Veuillez remplir tous les champs correctement.'
      );
    }
  }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe((msg) => {
      this.message = msg;
      if (msg) {
        setTimeout(() => this.messageService.clearMessage(), 2000); // Efface après 5s
      }
    });
  }
}

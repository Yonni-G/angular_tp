import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  message: string | null = null;

  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);
  private readonly messageService: MessageService = inject(MessageService);

  loginForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl(null, [Validators.required]),
  });

  onSubmit() {

    if (this.loginForm.valid) {
      const user: User = {
        username: this.loginForm.get('username')?.value || '',
        email: '',
        password: this.loginForm.get('password')?.value || '',
      };

      this.authService.login(user).subscribe({
        next: (response) => {
          this.router.navigate(['/search']);
        },
        error: (error) => {
          this.messageService.setMessage(
            error.error.message || 'Une erreur est survenue'
          );
        },
      });
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
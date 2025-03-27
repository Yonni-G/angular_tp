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
      const user = {
        name: '',
        username: this.loginForm.get('username')?.value || '',
        password: this.loginForm.get('password')?.value || '',
      };

      if (this.authService.checkUser(user)) {
        this.router.navigate(['/search']);
      } else this.messageService.setMessage('Identifiants incorrects !');
    } else this.messageService.setMessage('Un des champs est manquant !');
  }

  /*
  checkLogin() {
    if (this.username && this.password) {
      const user = {
        name: '',
        username: this.username,
        password: this.password,
      };

      if (this.authService.checkUser(user)) {
        this.router.navigate(['/profil']);
      } else this.messageService.setMessage('Identifiants incorrects !');
    } else this.messageService.setMessage('Un des champs est manquant !');
  }
    */

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe((msg) => {
      this.message = msg;
      if (msg) {
        setTimeout(() => this.messageService.clearMessage(), 2000); // Efface après 5s
      }
    });
  }
}

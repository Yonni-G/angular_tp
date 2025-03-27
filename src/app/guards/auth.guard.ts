import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MessageService } from '../services/message.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const messageService: MessageService = inject(MessageService)

  if (!authService.isAuthenticated()) {
    
    messageService.setMessage(
      'Vous devez être connecté pour accéder au profil'
    );
    router.navigate(['/login']);

    return false;
  }

  return true;
};

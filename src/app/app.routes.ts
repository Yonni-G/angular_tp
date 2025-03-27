import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProfilComponent } from './pages/auth/profil/profil.component';
import { authGuard } from './guards/auth.guard';
import { SearchComponent } from './pages/youtube/search/search.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
];

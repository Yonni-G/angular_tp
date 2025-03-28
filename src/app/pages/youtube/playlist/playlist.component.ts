import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-playlist',
  imports: [AsyncPipe],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  username: string | null = null

  private readonly authService: AuthService = inject(AuthService);

  ngOnInit() {
    // Lier directement à l'observable provenant de AuthService
    this.authService.username$.subscribe((username) => {
      this.username = username
    
  })
  }
}

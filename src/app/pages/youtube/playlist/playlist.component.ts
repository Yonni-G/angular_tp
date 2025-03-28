import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-playlist',
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {

  username: string | null = null
  private readonly authService: AuthService = inject(AuthService)

  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.username = username
    })
  }
}

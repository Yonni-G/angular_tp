
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Item, Videos } from '../../../models/youtube/videos';
import { ApiService } from '../../../services/api.service';
import { RouterLink } from '@angular/router';
import { PlaylistComponent } from "../playlist/playlist.component";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, RouterLink, PlaylistComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  videos!: Item[];
  private readonly apiService: ApiService = inject(ApiService);
  private readonly authService: AuthService = inject(AuthService);

  youtubeSearchForm = new FormGroup({
    search: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  onSubmit() {
    if (this.youtubeSearchForm.valid) {
      const searchValue = this.youtubeSearchForm.get('search')?.value ?? '';

      this.apiService.fetchVideos(searchValue).subscribe({
        next: (response: Videos) => {
          //console.log(response);
          this.videos = response.items;
        },
        error: (error: Error) => {
          //console.error(error);
        },
      });
    }
  }
}
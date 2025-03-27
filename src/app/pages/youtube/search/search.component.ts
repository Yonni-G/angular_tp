import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Item, Videos } from '../../../models/youtube/videos';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  // private readonly router: Router = inject(Router);
  //   private readonly authService: AuthService = inject(AuthService);
  //   private readonly messageService: MessageService = inject(MessageService);

  youtubeSearchForm = new FormGroup({
    search: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  videos!: Item[];
  private readonly apiService: ApiService = inject(ApiService);

  onSubmit() {
    if (this.youtubeSearchForm.valid) {
      const searchValue = this.youtubeSearchForm.get('search')?.value ?? ''; // Empêche null

      this.apiService.fetchVideos(searchValue).subscribe({
        next: (response: Videos) => {
          console.log(response);
          this.videos = response.items;
        },
        error: (error: Error) => {
          console.error(error);
        },
      });
    }
  }
}


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

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  videos!: Item[];
  private readonly apiService: ApiService = inject(ApiService);

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
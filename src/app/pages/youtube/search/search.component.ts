
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
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, RouterLink, PlaylistComponent, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  videos!: Item[];
  //isLoading: boolean = false;

  private readonly isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false); // Initialisation avec la valeur false
  public isLoading: Observable<boolean> = this.isLoadingSubject.asObservable();

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

      this.isLoadingSubject.next(true)
      this.apiService.fetchVideos(searchValue).subscribe({
        next: (response: Videos) => {
          //console.log(response);
          this.videos = response.items;
        },
        error: (error: Error) => {
          //console.error(error);
        },
        complete: () => {
          this.isLoadingSubject.next(false);
        }
      });
    }
  }
}
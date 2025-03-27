import { Component, inject } from '@angular/core';
import { Item, Videos } from '../../../models/youtube/videos';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss',
})
export class WatchComponent {
  video!: Item;
  private readonly apiService: ApiService = inject(ApiService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  

    if(id) {
      this.apiService.fetchVideos(id).subscribe({
        next: (response: Videos) => {
          //console.log(response);
          this.video = response.items[0];
        },
        error: (error: Error) => {
          //console.error(error);
        },
      });
    }
  }
}

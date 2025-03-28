import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Videos } from '../models/youtube/videos';
import { Observable } from 'rxjs';

const API_YT_BASE = environment.youtube_api;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiKey = 'AIzaSyAAb2fkffMP0-G8kwmfAuLapQrgabeELc8';

  fetchVideos(search: string): Observable<Videos> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    });

    const params = {
      part: 'snippet',
      maxResults: '25',
      q: search,
      key: this.apiKey,
    };

    return this.http.get<Videos>(`${API_YT_BASE}/search`, { params });
  }

  fetchVideo(id: string): Observable<Videos> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    });

    const params = {
      part: 'snippet,contentDetails,statistics',
      id: id,
      key: this.apiKey,
    };

    return this.http.get<Videos>(`${API_YT_BASE}/videos`, { params });
  }
}

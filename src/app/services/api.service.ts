import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Videos } from '../models/youtube/videos';
import { Observable } from 'rxjs';

const API_YT_BASE = environment.youtube_api;
const API_YT_KEY = environment.youtube_api_key;


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiKey = 'AIzaSyAAb2fkffMP0-G8kwmfAuLapQrgabeELc8';

  fetchVideos(search: string): Observable<Videos> {

    const params = {
      part: 'snippet',
      maxResults: '25',
      q: search,
      key: API_YT_KEY,
    };

    return this.http.get<Videos>(`${API_YT_BASE}/search`, { params });
  }

  fetchVideo(id: string): Observable<Videos> {

    const params = {
      part: 'snippet,contentDetails,statistics',
      id: id,
      key: API_YT_KEY,
    };

    return this.http.get<Videos>(`${API_YT_BASE}/videos`, { params });
  }
}

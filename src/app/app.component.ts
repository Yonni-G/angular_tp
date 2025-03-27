import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./pages/partials/header/header.component";
import { FooterComponent } from "./pages/partials/footer/footer.component";
import { PlaylistComponent } from "./pages/youtube/playlist/playlist.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, PlaylistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TP_form';
}

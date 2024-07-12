import { Component, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Subscription } from 'rxjs';
import { Album } from '../../models/album.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {

  private spotifySubscription: Subscription;

  title: string = "New Releases"
  albums: Album[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private titleService: Title
  ) {
    this.spotifySubscription = this.spotifyService
      .getNewReleases(0, 10)
      .subscribe(response => {
        this.albums = response.albums.items;
        this.titleService.setTitle("Spotify Web Browser");
    });
  }

  getArtistNames(idx: number): string[] {
    return this.albums[idx].artists.map(artist => artist.name);
  }

  ngOnDestroy(): void {
    this.spotifySubscription.unsubscribe();
  }

}

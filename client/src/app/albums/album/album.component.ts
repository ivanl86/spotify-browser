import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../../models/album.interface';
import { Artist } from '../../models/artist.interface';
import { Image } from '../../models/image.interface';
import { Track } from '../../models/track.interface';
import { Title } from '@angular/platform-browser';
import { CapitalizePipe } from '../../shared/pipes/capitalize/capitalize.pipe';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  providers: [ CapitalizePipe ]
})
export class AlbumComponent implements OnDestroy {

  private routeSubscription: Subscription;
  private spotifySubscription: Subscription;
  private id: string = "";

  album: Album = <Album>{ };

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private titleService: Title,
    private capitalizePipe: CapitalizePipe
  ) {
    this.routeSubscription = this.activatedRoute.queryParamMap.subscribe(
      params => {
        const id: string | null = params.get("id");
        if (id) {
          this.id = id;
        }
      });

    this.spotifySubscription = this.spotifyService
      .getAlbum(this.id)
      .subscribe(response => {
        this.album = response;
        this.titleService.setTitle(
          `${this.name} - ${this.capitalizePipe.transform(this.type)} by ${this.artists[0].name}`
        );
      });
  }

  get name(): string {
    return this.album?.name;
  }

  get artists(): Artist[] {
    return this.album?.artists ?? [];
  }

  get images(): Image[] {
    return this.album?.images ?? [];
  }

  get tracks(): Track[] {
    return this.album?.tracks?.items ?? [];
  }

  get releaseDate(): string {
    return this.album?.release_date;
  }

  get urlToSpotify(): string {
    return this.album?.external_urls?.spotify;
  }

  get totalTracks(): number {
    return this.album?.total_tracks;
  }

  get type(): string {
    return this.album?.type;
  }

  get totalTime(): number {
    return this.tracks.map(track => track.duration_ms).reduce((sum, next) => sum += next, 0);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.spotifySubscription.unsubscribe();
  }
}

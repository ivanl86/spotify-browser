import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../../models/track.interface';
import { Artist } from '../../models/artist.interface';
import { Album } from '../../models/album.interface';
import { Image } from '../../models/image.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent implements OnDestroy {

  private routeSubscription: Subscription;
  private id: string = "";

  track: Track = <Track>{};
  related: { tracks: Track[] } = { tracks: [] };

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private titleService: Title
  ) {

    this.routeSubscription = this.activatedRoute.queryParamMap
      .pipe(
        switchMap(params => {
          const id: string | null = params.get("id");
          if (id) {
            this.id = id;
            this.titleService.setTitle(this.name);
            return this.spotifyService.getTrack(this.id);
          } else {
            return [];
          }
        }),
        switchMap(track => {
          this.track = track;
          return this.spotifyService.getRecommendations(this.mainArtist.id, this.id);
        })
      )
      .subscribe({
        next: recommendations => {
          this.related = recommendations;
        },
        error: error => {
          console.log(error);
        }
      });
  }

  get name(): string {
    return this.track?.name;
  }

  get album(): Album {
    return this.track?.album;
  }

  get artists(): Artist[] {
    return this.track?.artists ?? [];
  }

  get duration(): number {
    return this.track?.duration_ms;
  }

  get images(): Image[] {
    return this.track?.album?.images ?? [];
  }

  get type(): string {
    return this.track?.type;
  }

  get urlToSpotify() {
    return this.track?.external_urls?.spotify;
  }

  get albumId(): string {
    return this.album?.id
  }

  get albumName(): string {
    return this.album?.name;
  }

  get releaseDate(): string {
    return this.album?.release_date
  }

  get mainArtist(): Artist {
    return this.artists[0] ?? <Artist>{};
  }

  get relatedTracks(): Track[] {
    return this.related?.tracks ?? [];
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}

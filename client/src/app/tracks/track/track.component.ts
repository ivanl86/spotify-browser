import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../../models/track.interface';
import { Artist } from '../../models/artist.interface';
import { Album } from '../../models/album.interface';
import { Image } from '../../models/image.interface';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent implements OnDestroy {

  private routeSubscription: Subscription;
  private spotifySubscription: Subscription;
  private id: string = "";

  track: Track = <Track>{ };

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService) {
    this.routeSubscription = this.activatedRoute.queryParamMap.subscribe(
      params => {
        const id: string | null = params.get("id");
        if (id) {
          this.id = id;
        }
      });

    this.spotifySubscription = this.spotifyService
      .getTrack(this.id)
      .subscribe(response => {
        this.track = response;
      });
  }

  get name(): string {
    return this.track?.name;
  }

  get album(): Album {
    return this.track?.album;
  }

  get artists(): Artist[] {
    return this.track && this.track.artists ? this.track.artists : [];
  }

  get duration(): number {
    return this.track?.duration_ms;
  }

  get images(): Image[] {
    return this.track?.album?.images ? this.track.album.images : [];
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
    return this.artists[0];
  }

  ngOnDestroy(): void {
    this.spotifySubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}

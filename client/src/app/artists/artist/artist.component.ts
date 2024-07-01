import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.interface';
import { Subscription } from 'rxjs';
import { Track } from '../../models/track.interface';
import { Image } from '../../models/image.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent implements OnDestroy {

  private routeSubscription: Subscription;
  private spotifySubscription: Subscription;
  private topTracksSubscription: Subscription;
  private id: string = "";

  artist: Artist = <Artist>{ };
  tracks: Track[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private titleService: Title
  ) {
    this.routeSubscription = this.activatedRoute.queryParamMap.subscribe(
      params => {
        const id: string | null = params.get("id");
        if (id) {
          this.id = id;
        }
      });

    this.spotifySubscription = this.spotifyService
      .getArtist(this.id)
      .subscribe(response => {
        this.artist = response;
        this.titleService.setTitle(this.name);
      });

    this.topTracksSubscription = this.spotifyService
      .getTopTracks(this.id)
      .subscribe(response => {
        this.tracks = response.tracks;
      });
  }

  get name(): string {
    return this.artist?.name;
  }

  get type(): string {
    return this.artist?.type;
  }

  get genres(): string[] {
    return this.artist?.genres ? this.artist.genres : [];
  }

  get images(): Image[] {
    return this.artist?.images ? this.artist.images : [];
  }

  ngOnDestroy(): void {
    this.topTracksSubscription.unsubscribe();
    this.spotifySubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}

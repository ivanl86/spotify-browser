import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.interface';
import { Subscription, switchMap } from 'rxjs';
import { Track } from '../../models/track.interface';
import { Image } from '../../models/image.interface';
import { Title } from '@angular/platform-browser';
import { Album } from '../../models/album.interface';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent implements OnDestroy {

  private routeSubscription: Subscription;
  private id: string = "";

  artist: Artist = <Artist>{ };
  tracks: Track[] = [];
  albums: Album[] = [];
  relatedArtists: Artist[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private titleService: Title
  ) {
    this.routeSubscription = this.activatedRoute.queryParamMap
      .pipe(
        switchMap(params => {
          this.id = params.get("id") ?? "";
          return this.spotifyService.getArtist(this.id);
        }),
        switchMap(artist => {
          this.artist = artist;
          this.titleService.setTitle(this.name);
          return this.spotifyService.getTopTracks(this.id);
        }),
        switchMap(trackList => {
          this.tracks = trackList.tracks;
          return this.spotifyService.getArtistAlbums(this.id);
        }),
        switchMap(albums => {
          this.albums = albums.items;
          return this.spotifyService.getRelatedArtists(this.id);
        })
      )
      .subscribe({
        next: relatedArtists => {
          this.relatedArtists = relatedArtists.artists;
        },
        error: error => {
          console.log(error);
        }
      });
  }

  get name(): string {
    return this.artist?.name;
  }

  get type(): string {
    return this.artist?.type;
  }

  get genres(): string[] {
    return this.artist?.genres ?? [];
  }

  get totalFollowers(): number {
    return this.artist?.followers?.total;
  }

  get urlToSpotify(): string {
    return this.artist?.external_urls?.spotify;
  }

  get images(): Image[] {
    return this.artist?.images ?? [];
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}

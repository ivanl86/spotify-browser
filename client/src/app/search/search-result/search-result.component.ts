import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../models/album.interface';
import { Artist } from '../../models/artist.interface';
import { Track } from '../../models/track.interface';
import { Image } from '../../models/image.interface';
import { AlbumList } from '../../models/album-list.interface';
import { ArtistList } from '../../models/artist-list.interface';
import { TrackList } from '../../models/track-list.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent implements OnDestroy {

  private routeSubscription: Subscription;
  private albumSubscription: Subscription;
  private artistSubscription: Subscription;
  private trackSubscription: Subscription;
  private query: string = "";

  albumList: AlbumList = <AlbumList>{};
  artistList: ArtistList = <ArtistList>{};
  trackList: TrackList = <TrackList>{};

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    this.routeSubscription = this.activatedRoute.queryParamMap.subscribe(
      params => {
        const query: string | null = params.get("query");
        if (query) {
          this.query = query;
        }
      }
    );

    this.albumSubscription = this.search(this.query, "album").subscribe(
      response => {
        this.albumList = response as AlbumList;
      }
    );
    this.artistSubscription = this.search(this.query, "artist").subscribe(
      response => {
        this.artistList = response as ArtistList;
      }
    );
    this.trackSubscription = this.search(this.query, "track").subscribe(
      response => {
        this.trackList = response as TrackList;
      }
    );
  }

  private search(query: string, type: string, limit: number = 20, offset: number = 0): Observable<AlbumList | ArtistList | TrackList> {
    return this.spotifyService
    .search(query, type, limit, offset)
    .pipe(
      map(response => {
        return response;
      })
    )
  }

  get albums(): Album[] {
    return this.albumList?.albums?.items ?? [];
  }

  get artists(): Artist[] {
    return this.artistList?.artists?.items ?? [];
  }

  get tracks(): Track[] {
    return this.trackList?.tracks?.items ?? [];
  }

  ngOnDestroy(): void {
    this.trackSubscription.unsubscribe();
    this.artistSubscription.unsubscribe();
    this.albumSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
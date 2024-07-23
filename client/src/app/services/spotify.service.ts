import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumList } from '../models/album-list.interface';
import { Album } from '../models/album.interface';
import { Artist } from '../models/artist.interface';
import { Track } from '../models/track.interface';
import { ArtistList } from '../models/artist-list.interface';
import { TrackList } from '../models/track-list.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private port: number = 8888;
  private baseUrl: string = `http://localhost:${this.port}/routes`;

  constructor(private http: HttpClient) { }

  public getNewReleases(offset: number = 0, limit: number = 20): Observable<AlbumList> {
    return this.http.get<AlbumList>(
      `${this.baseUrl}/browse/new-releases`,
      {
        params: {
          offset: offset.toString(),
          limit: limit.toString()
        }
      }
    );
  }

  public getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(
      `${this.baseUrl}/albums`,
      { params: { id: id } }
    );
  }

  public getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(
      `${this.baseUrl}/artists`,
      { params: { id: id } }
    );
  }

  public getTopTracks(id: string): Observable<{ tracks: Track[] }> {
    return this.http.get<{ tracks: Track[] }>(
      `${this.baseUrl}/artists/top-tracks`,
      { params: { id: id } }
    );
  }

  public getTrack(id: string): Observable<Track> {
    return this.http.get<Track>(
      `${this.baseUrl}/tracks`,
      { params: { id: id } }
    );
  }

  /**
   * getRecommendations
   */
  public getRecommendations(
    artistSeeds: string,
    trackSeeds: string,
    limit: number = 20
  ): Observable<{ tracks: Track[] }> {
    return this.http.get<{ tracks: Track[] }>(
      `${this.baseUrl}/tracks/recommendations`, {
        params: {
          artistSeeds: artistSeeds,
          trackSeeds: trackSeeds,
          limit: limit.toString()
        }
      }
    );
  }

  public search(
    query: string,
    type: string = "album",
    limit: number = 20,
    offset: number = 0
  ): Observable<AlbumList | ArtistList | TrackList> {
    return this.http.get<AlbumList | ArtistList | TrackList>(
      `${this.baseUrl}/search`,
      {
        params: {
          q: query,
          type: type,
          limit: limit.toString(),
          offset: offset.toString()
        }
      }
    );
  }
}

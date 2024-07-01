import { Artist } from "./artist.interface";
import { Image } from './image.interface';
import { Track } from "./track.interface";

export interface Album {
  album_type: string;
  artists: Artist[];
  external_urls: { spotify: string };
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  tracks: {
    items: Track[];
    total: number;
  }
  total_tracks: number;
  type: string;
}

import { Album } from "./album.interface";
import { Artist } from "./artist.interface";

export interface Track {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  id: string;
  name: string;
  external_urls: { spotify: string };
  popularity: number;
  track_number: number;
  type: string;
}

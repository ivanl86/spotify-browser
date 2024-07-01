import { Artist } from "./artist.interface";

export interface ArtistList {
  artists: {
    items: Artist[];
    limit: number;
    offset: number;
    total: number;
  }
}
